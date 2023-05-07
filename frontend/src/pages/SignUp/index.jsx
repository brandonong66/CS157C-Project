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
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"

import { useMutation, gql } from "@apollo/client"

// define user signup mutation
const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $accountType: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      accountType: $accountType
    ) {
      firstName
      lastName
      password
      email
      accountType
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
  const [accountType, setAccountType] = useState("")

  useEffect(() => {
    if (data?.createUser) {
      setUserCreated(true)
    } else {
      setUserCreated(false)
    }
  }, [data])

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log({
      email: formData.get("email"),
      password: formData.get("password"),
      accountType: accountType,
    })

    createUser({
      variables: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        accountType: accountType,
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
                <FormControl fullWidth>
                  <InputLabel id="typeLabel">Account Type</InputLabel>
                  <Select
                    id="accountType"
                    name="accountType"
                    label="Account Type"
                    labelId="typeLabel"
                    fullWidth
                    value={accountType}
                    onChange={handleAccountTypeChange}
                  >
                    <MenuItem value="applicant">Applicant</MenuItem>
                    <MenuItem value="employer">Employer</MenuItem>
                  </Select>
                </FormControl>
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
