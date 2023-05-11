import { React, useState, useEffect } from "react"
import { Card } from "@mui/material"
import jwt_decode from "jwt-decode"
import { useQuery, gql } from "@apollo/client"
import { Container, Typography } from "@mui/material"
import JobList from "../../components/JobList"

const GET_ALL_JOBS_BY_USER = gql`
  query GetAllJobsByUser($userId: ID!) {
    getAllJobsByUser(userId: $userId) {
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

function ApplicantView() {
  const [userId, setUserId] = useState()
  const {
    data: getAllJobsByUserData,
    loading: getAllJobsByUserLoading,
    error: getAllJobsByUserError,
    refetch: getAllJobsByUser,
  } = useQuery(GET_ALL_JOBS_BY_USER, {
    variables: { userId: userId },
  })

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const { userId } = jwt_decode(token)
    setUserId(userId)
  }, [])

  return (
    <Container sx={{ mt: 5 }}>
      <div>
        <Typography variant="h4">My Applied Jobs</Typography>
        <JobList jobs={getAllJobsByUserData?.getAllJobsByUser} />
      </div>
    </Container>
  )
}

export default ApplicantView
