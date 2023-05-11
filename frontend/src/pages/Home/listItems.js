import * as React from "react"
import { Link } from "react-router-dom"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GridViewIcon from "@mui/icons-material/GridView"
import PeopleIcon from "@mui/icons-material/People"
import BarChartIcon from "@mui/icons-material/BarChart"
import LayersIcon from "@mui/icons-material/Layers"
import AssignmentIcon from "@mui/icons-material/Assignment"
import GradingIcon from "@mui/icons-material/Grading"

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
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
