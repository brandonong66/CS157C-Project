import React, { useState, useEffect } from "react"
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material"

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
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/" underline="none" color="black">
          <Typography variant="h6" color="inherit">
            SearchEasy
          </Typography>
        </Link>

        {loggedIn ? (
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              alert("Logged out")
              sessionStorage.removeItem("token")
              setLoggedIn(false)
            }}
          >
            Logout
          </Button>
        ) : (
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar2
