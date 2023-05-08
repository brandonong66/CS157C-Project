require("dotenv").config()
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer, gql } = require("apollo-server")
const neo4j = require("neo4j-driver")
const userResolver = require("./resolvers/userResolver")
const jobResolver = require("./resolvers/jobResolver")
const { readFileSync } = require("fs")
const { join } = require("path")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")

const { GraphQLUpload } = require("graphql-upload")

// set up neo4j driver
// const driver = neo4j.driver(
//   "bolt://127.0.0.1:7687",
//   neo4j.auth.basic("neo4j", "password")
// )
const driver = neo4j.driver(
  // process.env.AURA_URI,
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD2)
)

const userTypeDefs = gql(
  readFileSync(join(__dirname, "schemas", "user.graphql"), "utf8")
)
const jobTypeDefs = gql(
  readFileSync(join(__dirname, "schemas", "job.graphql"), "utf8")
)
const resumePDFTypeDefs = gql(
  readFileSync(join(__dirname, "schemas", "resumePDF.graphql"), "utf8")
)

const typeDefs = mergeTypeDefs([userTypeDefs, jobTypeDefs])

const resolvers = mergeResolvers([
  userResolver,
  jobResolver,
  // { Upload: GraphQLUpload },
])
const server = new ApolloServer({
  cors: {
    origin: [
      "https://studio.apollographql.com",
      "http://localhost:3000",
      "http://localhost:4000/",
    ],
    credentials: true,
    referrerPolicy: "no-referrer",
  },
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { driver, req }
  },
})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
