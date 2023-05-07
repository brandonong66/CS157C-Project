import React from "react"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"

import { useMutation, gql } from "@apollo/client"

const CREATE_JOB = gql`
  mutation CreateJob(
    $title: String!
    $company: String!
    $position: String!
    $salary: String!
    $location: String!
    $description: String!
  ) {
    createJob(
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      title: formData.get("title"),
      company: formData.get("company"),
      position: formData.get("position"),
      salary: formData.get("salary"),
      location: formData.get("location"),
      description: formData.get("description"),
    })
    createJob({
      variables: {
        title: formData.get("title"),
        company: formData.get("company"),
        position: formData.get("position"),
        salary: formData.get("salary"),
        location: formData.get("location"),
        description: formData.get("description"),
      },
    })
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography component="h1" variant="h5">
        New Job
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
