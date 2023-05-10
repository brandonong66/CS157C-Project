import * as React from "react"
import { Button, Link, ListItem, ListItemText, Typography } from "@mui/material"

export default function JobItem({ job }) {
  const [isClicked, setIsClicked] = React.useState(false)
  const [buttonText, setButtonText] = React.useState("Apply")

  const handleApply = () => {
    if (!isClicked) setIsClicked(true)
    setButtonText("Applied")
    console.log(job?.id)
  }
  return (
    <ListItem>
      <ListItemText
        primary={
          <Link href={"/job/" + job?.jobId} color="inherit">
            {job?.company}
          </Link>
        }
        secondary={
          <React.Fragment>
            <Typography variant="body1" component="span">
              {job?.position}
            </Typography>
            <Typography variant="body1" component="span" display="block">
              {job?.salary}
            </Typography>
            <Typography variant="body1" component="span" display="block">
              {job?.location}
            </Typography>
          </React.Fragment>
        }
      />

      <Button variant="outlined">Apply</Button>
    </ListItem>
  )
}
