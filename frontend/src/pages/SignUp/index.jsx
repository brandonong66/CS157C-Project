import * as React from "react"
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"

import { useMutation, gql } from "@apollo/client"

// define mutation
const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      firstName
      lastName
      password
      email
    }
  }
`

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)
  // mutations return the data that was created. This data can be accessed in "data" which was declared in the useMutation hook
  const [userCreated, setUserCreated] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  useEffect(() => {
    if (data?.createUser) {
      setUserCreated(true)
    } else {
      setUserCreated(false)
    }
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })

    createUser({
      variables: {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      },
    })

    setUserCreated(null)
    setFormSubmitted(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userCreated === true && formSubmitted && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Account Successfully Created —{" "}
              <strong>
                <Link href="/login">Sign In</Link>
              </strong>
            </Alert>
          )}
          {userCreated === false && formSubmitted && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Failed To Create Account
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
