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
    getJobs: async (_, __, { driver }) => {
      const session = driver.session()
      const result = await session.run("MATCH (j:Job) RETURN j")
      session.close()
      return result.records.map((record) => {
        return record.get("j").properties
      })
    },
    getAllJobsByUser: async (_, { userId }, { driver }) => {
      const session = driver.session()
      // step 1: get user type
      const userResult = await session.run(
        "MATCH (u:User {userId: $userId}) RETURN u",
        { userId }
      )
      const userType = userResult.records[0].get("u").properties.accountType
      if (userType === "applicant") {
        // step 2: get all jobs applied by user
        const result = await session.run(
          "MATCH (u:User {userId: $userId})-[:Applied]->(j:Job) RETURN j",
          { userId }
        )

        return result.records.map((record) => {
          return record.get("j").properties
        })
      } else if (userType === "employer") {
        // step 2: get all jobs posted by user
        const result = await session.run(
          "MATCH (u:User {userId: $userId})-[:Posted]->(j:Job) RETURN j",
          { userId }
        )

        return result.records.map((record) => {
          return record.get("j").properties
        })
      } else {
        return null
      }
      session.close()
    },
    verifyJobApplication: async (_, { userId, jobId }, { driver }) => {
      const session = driver.session()
      const result = await session.run(
        "MATCH (u:User {userId: $userId})-[:Applied]->(j:Job {jobId: $jobId}) RETURN j",
        { userId, jobId }
      )
      return result.records.length === 1
    },
  },
  Mutation: {
    createJob: async (
      _,
      { userId, title, company, position, salary, location, description },
      { driver }
    ) => {
      const session = driver.session()
      const result = await session.run(
        "MATCH (u:User {userId:$userId}) CREATE (j:Job { jobId: randomUUID(), title: $title, company: $company, position: $position, salary: $salary, location: $location, description: $description}), (u)-[:Posted]->(j) RETURN j",
        { userId, title, company, position, salary, location, description }
      )
      session.close()
      return result.records[0].get("j").properties
    },
    applyToJob: async (_, { userId, jobId }, { driver }) => {
      const session = driver.session()
      const resultCheck = await session.run(
        `MATCH (u:User {userId: $userId})-[r:Applied]->(j:Job {jobId: $jobId}) RETURN r`,
        { userId, jobId }
      )

      // If the relationship exists, return false
      if (resultCheck.records.length > 0) {
        session.close()
        return false
      }

      // if not, create relationship
      const resultCreate = await session.run(
        `MATCH (u:User {userId: $userId}), (j:Job {jobId: $jobId}) CREATE (u)-[:Applied]->(j) RETURN j`,
        { userId, jobId }
      )

      session.close()
      return true
    },
  },
}

module.exports = jobResolver
