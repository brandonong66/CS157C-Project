require("dotenv").config()
const { Neo4jGraphQL } = require("@neo4j/graphql")
// const { OGM } = require("@neo4j/graphql-ogm")
const { ApolloServer, gql } = require("apollo-server")
const neo4j = require("neo4j-driver")

const personResolver = require("./resolvers/person")

const AURA_URI = process.env.AURA_URI
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

/**
 * Type definitions
 */
const typeDefs = gql`
  type Person {
    name: String!
    age: Int
  }
  type JobAd {
    title: String!
    description: String!
    company: Company! @relationship(type: "POSTED_BY", direction: OUT)
  }
  type Company {
    name: String!
    jobAds: [JobAd!]! @relationship(type: "POSTED_BY", direction: IN)
  }

  input PersonInput {
    name: String!
    age: Int
  }

  type Mutation {
    addPerson(person: PersonInput!): Person
  }

  type Query {
    person(name: String!): Person
  }
`


/**
 * Creating an instance of Neo4jGraphQL
 */
// const driver = neo4j.driver(
//   AURA_URI,
//   neo4j.auth.basic(USERNAME, PASSWORD)
// )

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

/**
 * create ApolloServer instance and start it
 */

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema,
    resolvers: {
      Query: { person: personResolver.person },
      Mutation: { addPerson: personResolver.addPerson },
    },
  })
  server.listen().then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`)
  })
})
