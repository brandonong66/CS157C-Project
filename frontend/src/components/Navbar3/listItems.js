import * as React from "react"
import { Link } from "react-router-dom"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ListItemText from "@mui/material/ListItemText"
import GridViewIcon from "@mui/icons-material/GridView"
import GradingIcon from "@mui/icons-material/Grading"

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <GridViewIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton component={Link} to="/profile">
      <ListItemIcon>
        <PersonOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>

    <ListItemButton component={Link} to="/jobs">
      <ListItemIcon>
        <WorkOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Jobs" />
    </ListItemButton>

    <ListItemButton component={Link} to="/myjobs">
      <ListItemIcon>
        <WorkOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="My Jobs" />
    </ListItemButton>

    <ListItemButton component={Link} to="/reviews">
      <ListItemIcon>
        <GradingIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItemButton>
  </React.Fragment>
)
