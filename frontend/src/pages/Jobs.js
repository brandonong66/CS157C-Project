import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CurrentProfile from "../components/CurrentProfile"
import JobList from "../components/JobList"
import Navbar from "../components/Navbar"
import NewJobForm from "../components/NewJobForm"
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

export default function Jobs() {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
    refetch: getAuthenticatedUser,
  } = useQuery(GET_AUTHENTICATEDUSER)
  const [userInfo, setUserInfo] = useState({})
  const testProfile = {
    name: "John Smith",
    position: "Software Engineer",
    visa: "F1 - Requires H1B sponsoring",
  }

  const testJobs = [
    {
      id: 1,
      company: "Company 1",
      position: "Software Engineer",
      location: "Remote",
    },
    {
      id: 2,
      company: "Company 2",
      position: "Software Engineer",
      location: "San Jose, CA",
    },
    {
      id: 3,
      company: "Company 2",
      position: "Software Engineer",
      location: "San Jose, CA",
    },
    {
      id: 4,
      company: "Company 2",
      position: "Software Engineer",
      location: "San Jose, CA",
    },
    {
      id: 5,
      company: "Company 2",
      position: "Software Engineer",
      location: "San Jose, CA",
    },
  ]

  // triggers only on first render
  useEffect(() => {
    getAuthenticatedUser()
  }, [])

  // triggers when queryData changes
  useEffect(() => {
    if (queryData?.getAuthenticatedUser) {
      setUserInfo({
        userId: queryData.getAuthenticatedUser.userId,
        accountType: queryData.getAuthenticatedUser.accountType,
      })
    }
  }, [queryData])

  function jobList() {
    return <JobList jobs={testJobs} />
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
         <Typography variant="h4">Jobs</Typography>
        {userInfo?.accountType === "applicant" && (
          <CurrentProfile user={queryData?.getAuthenticatedUser} />
        )}
        {userInfo?.accountType === "employer" && <NewJobForm />}
      </Box>

      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">Search Results</Typography>
        {jobList()}
      </Box>
    </Box>
  )
}
