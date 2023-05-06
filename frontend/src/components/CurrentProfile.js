import * as React from "react"
import { useEffect } from "react"
import { Card, CardContent, Typography } from "@mui/material"
import { useQuery, gql } from "@apollo/client"

export default function CurrentProfile({ user }) {
  return (
    <Card sx={{ minWidth: 380 }}>
      <CardContent>
        <Typography align="left">
          <strong>Name: </strong>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography align="left">
          <strong>Educational Background:</strong> {user?.educationalBackground}
        </Typography>
        <Typography align="left">
          <strong>University Name: </strong>
          {user?.universityName}
        </Typography>
        <Typography align="left">
          <strong>Field of Study: </strong>
          {user?.fieldOfStudy}
        </Typography>
        <Typography align="left">
          <strong>Desired Position: </strong>
          {user?.desiredPosition}
        </Typography>
        <Typography align="left">
          <strong>Visa status:</strong> {user?.visaStatus}
        </Typography>
      </CardContent>
    </Card>
  )
}
