import React from "react"
import { Card, Container } from "@mui/material"

import AuthWrapper from "../../components/AuthWrapper"
import EmployerAuthWrapper from "../../components/EmployerAuthWrapper"
import EmployerView from "./EmployerView"
import ApplicantAuthWrapper from "../../components/ApplicantAuthWrapper"
import ApplicantView from "./ApplicantView"

function index() {
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <EmployerAuthWrapper>
        <EmployerView />
      </EmployerAuthWrapper>
      <ApplicantAuthWrapper>
        <ApplicantView />
      </ApplicantAuthWrapper>
    </Container>
  )
}

export default AuthWrapper(index)
