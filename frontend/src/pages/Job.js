import { React, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, gql } from "@apollo/client"
import {
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
} from "@mui/material"
import jwt_decode from "jwt-decode"

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
const APPLY_TO_JOB = gql`
  mutation ApplyToJob($jobId: ID!, $userId: ID!) {
    applyToJob(jobId: $jobId, userId: $userId)
  }
`
const VERIFY_JOB_APPLICATION = gql`
  query VerifyJobApplication($jobId: ID!, $userId: ID!) {
    verifyJobApplication(jobId: $jobId, userId: $userId)
  }
`

function Job() {
  const [accountType, setAccountType] = useState()
  const [userId, setUserId] = useState()
  const [applied, setApplied] = useState(false)

  const { jobId } = useParams()
  const {
    data: getJobData,
    loading: getJobLoading,
    error: getJobError,
    refetch: getJob,
  } = useQuery(GET_JOB, {
    variables: { jobId },
  })
  const [
    applyToJob,
    {
      data: applyToJobData,
      loading: applyToJobLoading,
      error: applyToJobError,
    },
  ] = useMutation(APPLY_TO_JOB, {
    variables: { jobId, userId },
  })

  const {
    data: verifyJobApplicationData,
    loading: verifyJobApplicationLoading,
    error: verifyJobApplicationError,
    refetch: verifyJobApplication,
  } = useQuery(VERIFY_JOB_APPLICATION, {
    variables: { jobId, userId },
  })

  useEffect(() => {
    getJob(jobId)
    const token = sessionStorage.getItem("token")
    const { accountType, userId } = jwt_decode(token)
    setAccountType(accountType)
    setUserId(userId)
  }, [])

  useEffect(() => {
    verifyJobApplication(jobId, userId).then((res) => {
      setApplied(res.data.verifyJobApplication)
    })
  }, [jobId, userId])

  return (
    <Container sx={{ marginTop: "5rem" }}>
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
                <Divider variant="middle" sx={{ m: 3 }} />
                <Typography variant="p" sx={{ whiteSpace: "pre-wrap" }}>
                  {getJobData?.getJob.description}
                </Typography>
              </Box>
            </CardContent>
            {accountType === "applicant" &&
              (applied ? (
                <Button variant="outlined" color="primary" disabled>
                  Applied
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    applyToJob(jobId, userId).then(() => {
                      window.location.reload()
                    })
                  }}
                >
                  Apply
                </Button>
              ))}
            {accountType === "employer" && (
              <Button variant="outlined" color="primary">
                Edit
              </Button>
            )}
          </Card>
        </Container>
      )}
      {!getJobData && <Typography variant="h2">Loading...</Typography>}
    </Container>
  )
}

export default Job
