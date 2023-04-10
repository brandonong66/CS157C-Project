require("dotenv").config()
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer, gql } = require("apollo-server")
const neo4j = require("neo4j-driver")
const personResolver = require("./resolvers/personResolver")
const { readFileSync } = require("fs")
const { join } = require("path")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")

// set up neo4j driver
// const driver = neo4j.driver(
//   "bolt://127.0.0.1:7687",
//   neo4j.auth.basic("neo4j", "password")
// )
const driver = neo4j.driver(
  process.env.AURA_URI,
  neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD)
)

const typeDefs = gql(
  readFileSync(join(__dirname, "schemas", "person.graphql"), "utf8")
)

const resolvers = mergeResolvers([personResolver])
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { driver },
})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
