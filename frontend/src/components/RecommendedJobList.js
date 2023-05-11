import * as React from "react"
import JobItem from "./JobItem"
import { Grid } from "@mui/material"

export default function RecommendedJobList({ jobs }) {
  const jobItems = jobs?.map((jobResult) => (
    <Grid item sx={{ width: "500px", margin: "0.5em" }}>
      <JobItem
        key={jobResult?.job.jobId}
        job={jobResult.job}
        weightedScore={jobResult.weightedScore}
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
