import React from "react"
import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { useEffect } from "react"
import { Box, Container, Card, CardContent, Typography } from "@mui/material"

const GET_JOB = gql`
  query GetJob($jobId: ID!) {
    getJob(jobId: $jobId) {
      title
      company
      position
      location
      salary
      description
    }
  }
`

function Job() {
  const { jobId } = useParams()
  const {
    data: getJobData,
    loading: getJobLoading,
    error: getJobError,
    refetch: getJob,
  } = useQuery(GET_JOB, {
    variables: { jobId },
  })

  useEffect(() => {
    getJob(jobId)
  }, [])

  return (
    <div>
      {getJobData && (
        <Container maxWidth="lg">
          <Card sx={{ m: 5, p: 5 }}>
            <CardContent>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h4">{getJobData?.getJob.title}</Typography>
                <Typography variant="h5">
                  Company: {getJobData?.getJob.company}
                </Typography>
                <Typography variant="h5">
                  Position: {getJobData?.getJob.position}
                </Typography>
                <Typography variant="h5">
                  Salary: {getJobData?.getJob.salary}
                </Typography>
                <Typography variant="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {getJobData?.getJob.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      )}
      {!getJobData && <Typography variant="h2">Loading...</Typography>}
    </div>
  )
}

export default Job
