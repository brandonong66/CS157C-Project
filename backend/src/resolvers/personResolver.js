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
      const result = await session.run(
        "MATCH (p:Person {personId: $personId}) RETURN p",
        {
          personId,
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
    createPerson: async (
      _,
      {
        name,
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
        "CREATE (b:Person { personId: randomUUID(), name: $name, age: $age, password: $password, educationalBackground: $educationalBackground, universityName: $universityName, fieldOfStudy: $fieldOfStudy, desiredPosition: $desiredPosition, visaStatus: $visaStatus}) RETURN b",
        {
          name,
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
      return result.records[0].get("b").properties
    },
  },
}

module.exports = personResolver
