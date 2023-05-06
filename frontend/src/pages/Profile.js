import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import CurrentProfile from "../components/CurrentProfile"
import UploadResume from "../components/UploadResume"

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
    }
  }
`
const EDIT_PROFILE = gql`
  mutation EditProfile(
    $userId: ID!
    $educationalBackground: String!
    $universityName: String!
    $fieldOfStudy: String!
    $desiredPosition: String!
    $visaStatus: String!
  ) {
    editProfile(
      userId: $userId
      educationalBackground: $educationalBackground
      universityName: $universityName
      fieldOfStudy: $fieldOfStudy
      desiredPosition: $desiredPosition
      visaStatus: $visaStatus
    ) {
      userId
      firstName
      lastName
      email
      educationalBackground
      universityName
      fieldOfStudy
      desiredPosition
      visaStatus
    }
  }
`

export default function Profile() {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
    refetch: getAuthenticatedUser,
  } = useQuery(GET_AUTHENTICATEDUSER)
  const [
    editProfile,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_PROFILE)

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getAuthenticatedUser()
  }, [])
  useEffect(() => {
    if (queryData?.getAuthenticatedUser) {
      setUserId(queryData.getAuthenticatedUser.userId)
    }
  }, [queryData])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      educationalbg: formData.get("educationalbg"),
      university: formData.get("university"),
      study: formData.get("study"),
      position: formData.get("position"),
      visa: formData.get("visa"),
    })
    editProfile({
      variables: {
        userId: userId,
        educationalBackground: formData.get("educationalbg"),
        universityName: formData.get("university"),
        fieldOfStudy: formData.get("study"),
        desiredPosition: formData.get("position"),
        visaStatus: formData.get("visa"),
      },
    })
    console.log(mutationData)
  }

  return (
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
      <Typography variant="h4">Profile</Typography>
      <CurrentProfile user={queryData?.getAuthenticatedUser} />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="h6">Edit Profile:</Typography>

        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="educationalbg"
              label="Educational Background"
              name="educationalbg"
              autoComplete="educationalbg"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="university"
              label="University Name"
              id="university"
              autoComplete="university"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="study"
              label="Field of Study"
              id="study"
              autoComplete="study"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="position"
              label="Desired Position"
              id="position"
              autoComplete="positiion"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="visa"
              label="Visa Status"
              id="visa"
              autoComplete="visa"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
          <UploadResume />
        </Container>
        <Navbar />
      </Box>
    </Box>
  )
}
