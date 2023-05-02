require("dotenv").config()
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer, gql } = require("apollo-server")
const neo4j = require("neo4j-driver")
const personResolver = require("./resolvers/personResolver")
const { readFileSync } = require("fs")
const { join } = require("path")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")

const { Upload } = require("graphql-upload");
const resumePDFResolver = require("./resolvers/resumePDFResolver");
const resumePDFTypes = readFileSync(join(__dirname, "schemas", "resumePDF.graphql"), "utf8");

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

const typeDefs = gql(`
  ${mergeTypeDefs([personTypes, resumePDFTypes])}
  scalar Upload
`);

const resolvers = mergeResolvers([personResolver, resumePDFResolver, {Upload: Upload}])
const server = new ApolloServer({
  cors: {
    origin: "https://studio.apollographql.com",
    credentials: true,
    referrerPolicy: "no-referrer",
  },
  typeDefs,
  resolvers,
  context: { driver },
})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
