import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
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
    <Box component="main">
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        {userInfo?.accountType === "applicant" && (
          <CurrentProfile
            user={getAuthenticatedUserData?.getAuthenticatedUser}
          />
        )}
      </Box>

      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">Search Results</Typography>
        {getJobsData && jobList()}
      </Box>
      <Navbar />
    </Box>
  )
}
