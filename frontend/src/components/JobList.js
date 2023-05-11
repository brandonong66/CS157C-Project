import * as React from "react"
import JobItem from "./JobItem"
import { Grid } from "@mui/material"

export default function JobList({ jobs }) {
  const jobItems = jobs?.map((job) => (
    <Grid item sx={{ width: "500px", margin: "0.5em" }}>
      <JobItem
        key={job?.jobId}
        job={job}
        sx={{
          width: "100%",
          minWidth: 380,
          maxHeight: "450px",
          overflow: "auto",
        }}
      />
    </Grid>
  ))
  return (
    <div>
      <Grid container sx={{ justifyContent: "center" }}>
        {jobItems}
      </Grid>
    </div>
  )
}
