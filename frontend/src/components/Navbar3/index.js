import { React, useState, useEffect } from "react"
import {
  Box,
  Button,
  Divider,
  Link,
  List,
  Toolbar,
  Typography,
} from "@mui/material"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import { mainListItems } from "./listItems"

const drawerWidth = 200

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    height: "100vh",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#0F2461",
    },
  },
})
export default function Navbar3() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true)
    }
  }, [])
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const handleMouseEnter = () => {
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Toolbar
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          backgroundColor: "#0F2461",
          zIndex: mdTheme.zIndex.drawer + 1,
          position: "fixed",
          width: "100vw",
          top: 0,

        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", flexGrow: 1 }}
        >
          <Link href="/" underline="none" color="inherit">
            <Typography variant="h6" color="white">
              SearchEasy
            </Typography>
          </Link>
          {loggedIn ? (
            <Button
              variant="outlined"
              sx={{ color: "white", float: "right" }}
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
            <Button variant="outlined" sx={{ color: "white" }} href="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Toolbar />
        <Divider />
        <List component="nav">{mainListItems}</List>
      </Drawer>
    </ThemeProvider>
  )
}
