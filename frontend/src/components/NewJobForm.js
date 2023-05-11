import React from "react"
import { useState, useEffect } from "react"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"

import { useMutation, gql } from "@apollo/client"
import jwt_decode from "jwt-decode"

const CREATE_JOB = gql`
  mutation CreateJob(
    $userId: ID!
    $title: String!
    $company: String!
    $position: String!
    $salary: String!
    $location: String!
    $description: String!
  ) {
    createJob(
      userId: $userId
      title: $title
      company: $company
      position: $position
      salary: $salary
      location: $location
      description: $description
    ) {
      title
      company
      position
      salary
      location
      description
    }
  }
`

function NewJobForm() {
  const [createJob, { data, loading, error }] = useMutation(CREATE_JOB)
  const [userId, setUserId] = useState()
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const { userId } = jwt_decode(token)
    setUserId(userId)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      userId: userId,
      title: formData.get("title"),
      company: formData.get("company"),
      position: formData.get("position"),
      salary: formData.get("salary"),
      location: formData.get("location"),
      description: formData.get("description"),
    })
    createJob({
      variables: {
        userId: userId,
        title: formData.get("title"),
        company: formData.get("company"),
        position: formData.get("position"),
        salary: formData.get("salary"),
        location: formData.get("location"),
        description: formData.get("description"),
      },
    }).then(()=>{
      window.location.reload()
    })
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography component="h1" variant="h5">
        Add a New Job
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          autoComplete="Title"
          name="title"
          required
          fullWidth
          id="title"
          label="title"
          autoFocus
          sx={{ mt: 2 }}
        />
        <TextField
          autoComplete="Company"
          name="company"
          required
          fullWidth
          id="company"
          label="company"
          autoFocus
          sx={{ mt: 2 }}
        />
        <TextField
          autoComplete="Position"
          name="position"
          required
          fullWidth
          id="position"
          label="position"
          autoFocus
          sx={{ mt: 2 }}
        />
        <TextField
          autoComplete="salary"
          name="salary"
          required
          fullWidth
          id="salary"
          label="salary"
          autoFocus
          sx={{ mt: 2 }}
        />
        <TextField
          autoComplete="Location"
          name="location"
          required
          fullWidth
          id="location"
          label="location"
          autoFocus
          sx={{ mt: 2 }}
        />
        <TextField
          autoComplete="Description"
          name="description"
          required
          fullWidth
          id="description"
          label="description"
          autoFocus
          multiline={true}
          rows={7}
          sx={{ mt: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default NewJobForm
