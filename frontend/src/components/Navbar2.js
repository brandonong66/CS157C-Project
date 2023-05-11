import React, { useState, useEffect } from "react"
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material"
import HomeWorkIcon from "@mui/icons-material/HomeWork"
import MenuIcon from "@mui/icons-material/Menu"

function Navbar2() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true)
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <div>
          {loggedIn ? (
            <>
              <IconButton onClick={handleClick} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}component={Link} href="/home">
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose}component={Link} href="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}component={Link} href="/jobs">
                  Jobs
                </MenuItem>
                <MenuItem onClick={handleClose}component={Link} href="/reviews">
                  Reviews
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    alert("Logged out")
                    sessionStorage.removeItem("token")
                    setLoggedIn(false)
                    window.location.assign("/")
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
              
            </>
          ) : (
            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5, borderColor: "white", color: "white" }}>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar2
