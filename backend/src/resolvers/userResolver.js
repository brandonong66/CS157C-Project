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
  },
  Mutation: {
    createUser: async (
      _,
      {
        firstName,
        lastName,
        email,
        age,
        password,
        educationalBackground,
        universityName,
        fieldOfStudy,
        desiredPosition,
        visaStatus,
      },
      { driver }
    ) => {
      const session = driver.session()
      const result = await session.run(
        "CREATE (u:User { userId: randomUUID(), firstName: $firstName, lastName: $lastName, email: $email, password: $password}) RETURN u",
        {
          firstName,
          lastName,
          email,
          age,
          password,
          educationalBackground,
          universityName,
          fieldOfStudy,
          desiredPosition,
          visaStatus,
        }
      )
      session.close()
      return result.records[0].get("u").properties
    },
  },
  // Mutation: {
  //   createProfile: async (
  //     _,
  //     {
  //       userId,
  //       educationalBackground,
  //       universityName,
  //       fieldOfStudy,
  //       desiredPosition,
  //       visaStatus,
  //     },
  //     { driver }
  //   ) => {
  //     const session = driver.session()
  //     const result = await session.run(
  //       "CREATE (u:User { userId: $userId, educationalBackground: $educationalBackground, universityName: $universityName, fieldOfStudy: $fieldOfStudy, desiredPosition: $desiredPosition, visaStatus: $visaStatus}) RETURN b",
  //       {
  //         userId,
  //         educationalBackground,
  //         universityName,
  //         fieldOfStudy,
  //         desiredPosition,
  //         visaStatus,
  //       }
  //     )
  //     session.close()
  //     return result.records[0].get("u").properties
  //   },
  // },
}

module.exports = userResolver
