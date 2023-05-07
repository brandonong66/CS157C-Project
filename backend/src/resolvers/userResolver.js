const jwt = require("jsonwebtoken")
require("dotenv").config()
const { calculateRoleScores } = require("../utilities/scoreUtil")
const cosineSimilarity = require("../utilities/cosineSimilarity")
const { GraphQLJSONObject } = require("graphql-type-json")
/**
 * 'Query: {' - this will be for reading data
 * 'getUser' - name of the query
 *  async (_, { id }, { driver }) => { - arguments for the resolver.
 *     The typical resolver function format is
 *     fieldName: (parent, args, context, info) => {}
 *     - each arg is an object, e.g. for multiple items in context, use { driver, otherContextItem }
 *  '{ driver }' - context information that is needed to conenct to the database
 *  'MATCH (p:User {id: $id}) RETURN p' - cypher query, the querying language for neo4j
 */

const userResolver = {
  JSONObject: GraphQLJSONObject,
  Query: {
    getUser: async (_, { userId }, { driver }) => {
      const session = driver.session()
      const result = await session.run(
        "MATCH (p:User {userId: $userId}) RETURN p",
        {
          userId,
        }
      )
      session.close()
      if (result.records.length === 0) {
        return null
      }
      return result.records[0].get("p").properties
    },
    getAuthenticatedUser: async (_, args, context) => {
      const session = context.driver.session()
      const authHeader = context.req.headers.authorization
      if (!authHeader) throw new Error("No token provided")

      const token = authHeader.split(" ")[1]
      try {
        const decodedToken = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET)
        const userId = decodedToken.userId
        const result = await session.run(
          "MATCH (p:User {userId: $userId}) RETURN p",
          { userId }
        )
        return result.records[0].get("p").properties
      } catch (err) {
        throw new Error("Invalid Token")
      }
    },
  },

  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, email, password, accountType },
      { driver }
    ) => {
      const session = driver.session()

      // check if email already exists
      const checkEmail = await session.run(
        "MATCH (u:User {email: $email}) RETURN u",
        {
          email,
        }
      )
      if (checkEmail.records.length !== 0) {
        return null
      }

      const result = await session.run(
        "CREATE (u:User { userId: randomUUID(), firstName: $firstName, lastName: $lastName, email: $email, password: $password, accountType: $accountType}) RETURN u",
        {
          firstName,
          lastName,
          email,
          password,
          accountType,
        }
      )
      session.close()
      return result.records[0].get("u").properties
    },
    login: async (_, { email, password }, { driver }) => {
      const session = driver.session()
      const result = await session.run(
        "MATCH (u:User {email: $email, password: $password}) RETURN u",
        {
          email,
          password,
        }
      )
      session.close()
      if (result.records.length === 0) {
        return "bad login"
      }
      const token = jwt.sign(
        {
          userId: result.records[0].get("u").properties.userId,
          email: result.records[0].get("u").properties.email,
          accountType: result.records[0].get("u").properties.accountType,
        },
        process.env.JSONWEBTOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      )
      return {
        token: token,
        user: result.records[0].get("u").properties,
      }
    },
    editProfile: async (
      _,
      {
        userId,
        educationalBackground,
        universityName,
        fieldOfStudy,
        desiredPosition,
        visaStatus,
        resume,
      },
      { driver }
    ) => {
      const session = driver.session()

      //generate role scores based on resume input
      const roleScores = calculateRoleScores(resume)
      const roleScoresJSON = JSON.stringify(roleScores)

      const result = await session.run(
        `MATCH (u:User { userId: $userId}) SET u.educationalBackground = $educationalBackground, u.universityName = $universityName, u.fieldOfStudy = $fieldOfStudy, u.desiredPosition = $desiredPosition, u.visaStatus = $visaStatus, u.resume = $resume, u.roleScores = $roleScoresJSON RETURN u`,
        {
          userId,
          educationalBackground,
          universityName,
          fieldOfStudy,
          desiredPosition,
          visaStatus,
          resume,
          roleScoresJSON,
        }
      )

      // create relationships between users with similar role scores
      const user = result.records[0].get("u").properties
      const allUsers = await session.run("MATCH (u:User) return u")
      for (const record of allUsers.records) {
        const otherUser = record.get("u").properties
        if (otherUser.userId !== user.userId) {
          const similarity = cosineSimilarity(
            JSON.parse(user.roleScores),
            JSON.parse(otherUser.roleScores)
          )
          const threshold = 0.8
          if (similarity >= threshold) {
            await session.run(
              `
                MATCH (u1:User {userId: $userId1}), (u2:User {userId: $userId2})
                MERGE (u1)-[r:SCORE_SIMILARITY {similarity: $similarity}]->(u2)
                `,
              {
                userId1: user.userId,
                userId2: otherUser.userId,
                similarity,
              }
            )
          }
        }
      }

      session.close()
      return result.records[0].get("u").properties
    },
  },
}

module.exports = userResolver
