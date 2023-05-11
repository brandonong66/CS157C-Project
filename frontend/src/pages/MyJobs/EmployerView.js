import { React, useState, useEffect } from "react"
import { Card, Container, Typography } from "@mui/material"
import NewJobForm from "../../components/NewJobForm"
import JobList from "../../components/JobList"
import { useQuery, gql } from "@apollo/client"
import jwt_decode from "jwt-decode"

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

function EmployerView() {
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
    <Container>
      <Card sx={{ m: 5, p: 5 }}>
        <NewJobForm />
      </Card>
      <Typography variant="h5">My Posted Jobs</Typography>
      <JobList jobs={getAllJobsByUserData?.getAllJobsByUser} />
    </Container>
  )
}

export default EmployerView
