module.exports = {
  async test() {
    return { id: "1", name: "test" }
  },
  async person(_, { name }, context, info) {
    const session = context.driver.session()
    try {
      const result = await session.run(
        `
          MATCH (person:Person {name: $name})
          RETURN person
          `,
        { name }
      )
      return (
        result.records.map((record) => record.get("person").properties)[0] ||
        null
      )
    } finally {
      session.close()
    }
  },
  async addPerson(_, { person }, context, info) {
    const session = context.driver.session()
    try {
      const result = await session.run(
        `
            CREATE (p:Person {name: $name, age: $age})
            RETURN p
            `,
        { name: person.name, age: person.age }
      )
      return (
        result.records.map((record) => record.get("p").properties)[0] || null
      )
    } finally {
      session.close()
    }
  },
  // ... other resolvers
}
