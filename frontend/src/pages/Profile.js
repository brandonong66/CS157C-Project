import * as React from "react"
import { useState, useEffect } from "react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import NewNavbar from "../components/newVerticalNav"
import CurrentProfile from "../components/CurrentProfile"
import AuthWrapper from "../components/AuthWrapper"

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
    $resume: String!
  ) {
    editProfile(
      userId: $userId
      educationalBackground: $educationalBackground
      universityName: $universityName
      fieldOfStudy: $fieldOfStudy
      desiredPosition: $desiredPosition
      visaStatus: $visaStatus
      resume: $resume
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
      resume
    }
  }
`

function Profile() {
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
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    getAuthenticatedUser()
  }, [])

  useEffect(() => {
    if (queryData?.getAuthenticatedUser) {
      setUserId(queryData.getAuthenticatedUser.userId)
      setUserProfile({
        educationalBackground:
          queryData.getAuthenticatedUser.educationalBackground,
        universityName: queryData.getAuthenticatedUser.universityName,
        fieldOfStudy: queryData.getAuthenticatedUser.fieldOfStudy,
        desiredPosition: queryData.getAuthenticatedUser.desiredPosition,
        visaStatus: queryData.getAuthenticatedUser.visaStatus,
        resume: queryData.getAuthenticatedUser.resume,
      })
    }
  }, [queryData])

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      educational: formData.get("educationalbg"),
      university: formData.get("university"),
      study: formData.get("study"),
      position: formData.get("position"),
      visa: formData.get("visa"),
      resume: formData.get("resume"),
    })
    editProfile({
      variables: {
        userId: userId,
        educationalBackground: formData.get("educationalBackground"),
        universityName: formData.get("universityName"),
        fieldOfStudy: formData.get("fieldOfStudy"),
        desiredPosition: formData.get("desiredPosition"),
        visaStatus: formData.get("visaStatus"),
        resume: formData.get("resume"),
      },
    }).then(() => {
      window.location.reload()
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="educationalbg"
              label="Educational Background"
              name="educationalBackground"
              autoComplete="educationalbg"
              autoFocus
              value={userProfile?.educationalBackground || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="universityName"
              label="University Name"
              id="university"
              autoComplete="university"
              value={userProfile?.universityName || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fieldOfStudy"
              label="Field of Study"
              id="study"
              autoComplete="study"
              value={userProfile?.fieldOfStudy || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="desiredPosition"
              label="Desired Position"
              id="position"
              autoComplete="positiion"
              value={userProfile?.desiredPosition || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="visaStatus"
              label="Visa Status"
              id="visa"
              autoComplete="visa"
              value={userProfile?.visaStatus || ""}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="resume"
              label="resume"
              id="resume"
              autoComplete="resume"
              value={userProfile?.resume || ""}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Container>
        
      </Box>
    </Box>
  )
}

export default AuthWrapper(Profile)
