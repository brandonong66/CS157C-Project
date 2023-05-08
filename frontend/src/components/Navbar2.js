import React, { useState, useEffect } from "react"
import { AppBar, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import HomeWorkIcon from '@mui/icons-material/HomeWork';

function Navbar2() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true)
    }
  }, [])
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#0F2461", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF" }}>
        <Link href="/" underline="none" color="inherit">
          <Typography variant="h6" color="inherit">
            SearchEasy
          </Typography>
        </Link>
        {loggedIn ? (
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5, borderColor: "white", color: "white" }}
            onClick={() => {
              alert("Logged out")
              sessionStorage.removeItem("token")
              setLoggedIn(false)
              window.location.assign("/")
            }}
          >
            Logout
          </Button>
        ) : (
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5, borderColor: "white", color: "white" }}>
            Login
          </Button>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Navbar2
