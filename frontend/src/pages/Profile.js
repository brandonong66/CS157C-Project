import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Navbar from "../components/Navbar"
import CurrentProfile from "../components/CurrentProfile"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import UploadResume from "../components/UploadResume"

export default function Profile() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      educationalbg: data.get("educationalbg"),
      university: data.get("university"),
      study: data.get("study"),
      position: data.get("position"),
      visa: data.get("visa"),
    })
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
      <CurrentProfile />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography variant="h6">Create New Profile:</Typography>

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
