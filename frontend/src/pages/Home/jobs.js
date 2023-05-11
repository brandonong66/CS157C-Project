import * as React from "react"
import Title from "./title"
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { useQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
const GET_ALL_JOBS_BY_USER = gql`
  query GetAllJobsByUser($userId: ID!) {
    getAllJobsByUser(userId: $userId) {
      jobId
      title
      company
      position
      location
      salary
      description
    }
  }
`

export default function Jobs() {
  const [userInfo, setUserInfo] = useState({})
  const {
    data: getAllJobsByUserData,
    loading: getAllJobsByUserLoading,
    error: getAllJobsByUserError,
    refetch: getAllJobsByUser,
  } = useQuery(GET_ALL_JOBS_BY_USER, {
    variables: { userId: userInfo.userId },
  })
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const { userId, accountType } = jwt_decode(token)
    setUserInfo({ userId: userId, accountType: accountType })
  }, [])
  useEffect(() => {
    console.log(userInfo)
    getAllJobsByUser()
  }, [userInfo])

  return (
    <React.Fragment>
      <Title>
        {userInfo.accountType === "applicant" && "Recently Applied"}
        {userInfo.accountType === "employer" && "Recently Posted"}
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getAllJobsByUserData?.getAllJobsByUser.slice(0, 3).map((job) => (
            <TableRow key={job.jodId}>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{job.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/myjobs" sx={{ mt: 3 }}>
        View More
      </Link>
    </React.Fragment>
  )
}
