import * as React from "react"
import {
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material"

export default function JobItem({ job }) {
  const [isClicked, setIsClicked] = React.useState(false)
  const [buttonText, setButtonText] = React.useState("Apply")

  const handleApply = () => {
    if (!isClicked) setIsClicked(true)
    setButtonText("Applied")
    console.log(job?.id)
  }
  return (
    <Card>
      <CardContent>
        <Link href={"/job/" + job?.jobId} color="inherit" underline="none">
          <Typography variant="h5">{job?.company}</Typography>
          <Typography variant="body1" component="span">
            {job?.position}
          </Typography>
          <Typography variant="body1" component="span" display="block">
            {job?.salary}
          </Typography>
          <Typography variant="body1" component="span" display="block">
            {job?.location}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}
