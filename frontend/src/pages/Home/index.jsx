import * as React from "react"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import AuthWrapper from "../../components/AuthWrapper"

import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"

import Chart from "./chart"
import Deposits from "./deposits"
import Jobs from "./jobs"

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

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#0F2461",
    },
  },
})

function Home() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={5}>
              {/* Chart */}
              
              {/* Recent Deposits */}
             
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Jobs />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default AuthWrapper(Home)
