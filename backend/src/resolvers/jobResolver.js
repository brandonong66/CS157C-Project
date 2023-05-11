const { calculateRoleScores } = require("../utilities/scoreUtil")
const cosineSimilarity = require("../utilities/cosineSimilarity")

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
          "MATCH (u:User {userId: $userId})-[r:Applied]->(j:Job) RETURN j ORDER BY r.appliedDate DESC",
          { userId }
        )

        return result.records.map((record) => {
          return record.get("j").properties
        })
      } else if (userType === "employer") {
        // step 2: get all jobs posted by user
        const result = await session.run(
          "MATCH (u:User {userId: $userId})-[r:Posted]->(j:Job) RETURN j ORDER BY r.postedDate DESC",
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
    getRecommendedJobs: async (_, { userId }, { driver }) => {
      let jobsByScore = {}
      const session = driver.session()
      // step 1:get jobs with similar scores
      const allJobsResult = await session.run(`MATCH (j:Job) return j`)
      const allJobs = allJobsResult.records.map((record) => {
        return record.get("j").properties
      })
      const userResult = await session.run(
        `MATCH (u:User {userId: $userId}) return u.roleScores`,
        { userId }
      )
      const userRoleScores = JSON.parse(
        userResult.records[0].get("u.roleScores")
      )
      for (const job of allJobs) {
        const jobRoleScores = JSON.parse(job.roleScores)
        const similarityScore = cosineSimilarity(userRoleScores, jobRoleScores)
        const threshold = 0.6
        if (similarityScore > threshold) {
          jobsByScore[job.jobId] = {
            job,
            similarityScore,
            weightedScore: 0.7 * similarityScore,
          }
        }
      }

      // step 2: get jobsdd applied to by similar users
      const similarUsersResult = await session.run(
        `MATCH (u1:User {userId: $userId})-[r:SCORE_SIMILARITY]->(u2:User)-[r2:Applied]->(j:Job) return distinct j, r.similarity`,
        { userId }
      )

      for (const record of similarUsersResult.records) {
        const job = record.get("j").properties
        const similarityScore = record.get("r.similarity")
        const weightedScore = 0.7 * similarityScore + 0.3
        if (job.jobId in jobsByScore) {
          // If the job already exists, update the weightedScore if the new score is higher
          jobsByScore[job.jobId].weightedScore = Math.max(
            jobsByScore[job.jobId].weightedScore,
            weightedScore
          )
        } else {
          // If the job does not exist, add it to the list
          jobsByScore[job.jobId] = { job, similarityScore, weightedScore }
        }
      }
      // Convert jobsByScore object to array and sort by weightedScore
      const recommendedJobs = Object.values(jobsByScore)
      recommendedJobs.sort((a, b) => b.weightedScore - a.weightedScore)

      return recommendedJobs
    },
  },
  Mutation: {
    createJob: async (
      _,
      { userId, title, company, position, salary, location, description },
      { driver }
    ) => {
      // calculate role score for job
      const jobString = "" + title + position + description
      const roleScores = calculateRoleScores(jobString)
      const roleScoresJSON = JSON.stringify(roleScores)

      const session = driver.session()
      const result = await session.run(
        `MATCH (u:User {userId:$userId}) 
        CREATE (j:Job { jobId: randomUUID(), title: $title, company: $company, position: $position, salary: $salary, location: $location, description: $description, roleScores: $roleScoresJSON}),
        (u)-[:Posted {postedDate:datetime({epochmillis:timestamp()})}]->(j) RETURN j`,
        {
          userId,
          title,
          company,
          position,
          salary,
          location,
          description,
          roleScoresJSON,
        }
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
        `MATCH (u:User {userId: $userId}), (j:Job {jobId: $jobId}) 
        CREATE (u)-[:Applied {appliedDate:datetime({epochmillis:timestamp()})}]->(j) RETURN j`,
        { userId, jobId }
      )

      session.close()
      return true
    },
  },
}

module.exports = jobResolver
