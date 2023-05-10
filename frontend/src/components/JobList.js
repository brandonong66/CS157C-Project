import * as React from "react"
import JobItem from "./JobItem"
import { List, Paper } from "@mui/material"

export default function JobList({ jobs }) {
  const jobItems = jobs.map((job) => <JobItem key={job?.jobId} job={job} />)
  return (
    <div>
      <Paper>
        <List
          sx={{
            width: "100%",
            minWidth: 380,
            maxHeight: "450px",
            overflow: "auto",
          }}
        >
          {jobItems}
        </List>
      </Paper>
    </div>
  )
}
