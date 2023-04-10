/**
 * 'Query: {' - this will be for reading data
 * 'getPerson' - name of the query
 *  async (_, { id }, { driver }) => { - arguments for the resolver.
 *     The typical resolver function format is
 *     fieldName: (parent, args, context, info) => {}
 *     - each arg is an object, e.g. for multiple items in context, use { driver, otherContextItem }
 *  '{ driver }' - context information that is needed to conenct to the database
 *  'MATCH (p:Person {id: $id}) RETURN p' - cypher query, the querying language for neo4j
 */

const personResolver = {
  Query: {
    getPerson: async (_, { personId }, { driver }) => {
      const session = driver.session()
      const result = await session.run("MATCH (p:Person {personId: $personId}) RETURN p", {
        personId,
      })
      session.close()
      return result.records[0].get("p").properties
    },
  },
  Mutation: {
    createPerson: async (_, { personId, name, age }, { driver }) => {
      const session = driver.session()
      const result = await session.run(
        "CREATE (b:Person { personId: $personId, name: $name, age: $age}) RETURN b",
        { personId, name, age }
      )
      session.close()
      return result.records[0].get("b").properties
    },
  },
}

module.exports = personResolver
