import * as React from "react"
import { Box, Container, Typography } from "@mui/material"
import CurrentProfile from "../../components/CurrentProfile"
import JobList from "../../components/JobList"
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"

const GET_AUTHENTICATEDUSER = gql`
  query GetAuthenticatedUser {
    getAuthenticatedUser {
      userId
      firstName
      lastName
      email
      educationalBackground
      universityName
      fieldOfStudy
      desiredPosition
      visaStatus
      resume
      accountType
    }
  }
`
const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      jobId
      title
      company
      position
      location
      salary
      description
    }
  }
`
export default function Jobs() {
  const {
    data: getAuthenticatedUserData,
    loading: getAuthenticatedUserLoading,
    error: getAuthenticatedUserError,
    refetch: getAuthenticatedUser,
  } = useQuery(GET_AUTHENTICATEDUSER)

  const {
    data: getJobsData,
    loading: getJobsLoading,
    error: getJobsError,
    refetch: getJobs,
  } = useQuery(GET_JOBS)

  const [userInfo, setUserInfo] = useState({})
  const testProfile = {
    name: "John Smith",
    position: "Software Engineer",
    visa: "F1 - Requires H1B sponsoring",
  }

  // triggers only on first render
  useEffect(() => {
    getAuthenticatedUser()
    getJobs()
  }, [])

  // triggers when getAuthenticatedUserData changes
  useEffect(() => {
    if (getAuthenticatedUserData?.getAuthenticatedUser) {
      setUserInfo({
        userId: getAuthenticatedUserData.getAuthenticatedUser.userId,
        accountType: getAuthenticatedUserData.getAuthenticatedUser.accountType,
      })
    }
  }, [getAuthenticatedUserData])

  function jobList() {
    return <JobList jobs={getJobsData?.getJobs} />
  }

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Typography variant="h4">Jobs</Typography>

      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {getJobsData && jobList()}
      </Box>
    </Container>
  )
}
