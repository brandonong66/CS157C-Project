import * as React from "react"
import { Box, Container, Typography } from "@mui/material"
import CurrentProfile from "../../components/CurrentProfile"
import JobList from "../../components/JobList"
import RecommendedJobList from "../../components/RecommendedJobList"
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

const GET_RECOMMENDED_JOBS = gql`
  query GetRecommendedJobs($userId: ID!) {
    getRecommendedJobs(userId: $userId) {
      job {
        jobId
        title
        company
        position
        location
        salary
        description
      }
      similarityScore
      weightedScore
    }
  }
`
export default function Jobs() {
  const [userInfo, setUserInfo] = useState({})
  const [jobs, setJobs] = useState([])
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

  const {
    data: getRecommendedJobsData,
    loading: getRecommendedJobsLoading,
    error: getRecommendedJobsError,
    refetch: getRecommendedJobs,
  } = useQuery(GET_RECOMMENDED_JOBS, {
    variables: {
      userId: userInfo?.userId,
    },
    skip: !userInfo?.userId, // Skip the query if the userId is not available
  })

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

  useEffect(() => {
    if (userInfo.accountType === "applicant") {
      getRecommendedJobs()
    }
  }, [userInfo])

  useEffect(() => {
    if (userInfo.accountType === "applicant") {
      setJobs(getRecommendedJobsData?.getRecommendedJobs)
    } else if (userInfo.accountType === "employer") {
      setJobs(getJobsData?.getJobs)
    }
  }, [getRecommendedJobsData, getJobsData])

  function jobList() {
    if (userInfo.accountType === "applicant")
    {
      return <RecommendedJobList jobs={getRecommendedJobsData?.getRecommendedJobs} />
    }
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
