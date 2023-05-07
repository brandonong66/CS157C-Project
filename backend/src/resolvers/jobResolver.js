const jobResolver = {
  Query: {
    getJob: async (_, { jobId }, { driver }) => {
      const session = driver.session()
      const result = await session.run(
        "MATCH (j:Job {jobId: $jobId}) RETURN j",
        {
          jobId,
        }
      )
      session.close()
      if (result.records.length === 0) {
        return null
      }
      return result.records[0].get("j").properties
    },
  },
  Mutation: {
    createJob: async (
      _,
      { title, company, position, salary, location, description },
      { driver }
    ) => {
      const session = driver.session()
      const result = await session.run(
        "CREATE (j:Job { jobId: randomUUID(), title: $title, company: $company, position: $position, salary: $salary, location: $location, description: $description}) RETURN j",
        {
          title,
          company,
          position,
          salary,
          location,
          description,
        }
      )
      session.close()
      return result.records[0].get("j").properties
    },
  },
}

module.exports = jobResolver
