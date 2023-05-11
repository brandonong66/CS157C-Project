import { React, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

const ApplicantAuthWrapper = ({ children }) => {
  const [isApplicant, setIsApplicant] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const decodedToken = jwt_decode(token)
      if (decodedToken && decodedToken.accountType === "applicant") {
        setIsApplicant(true)
      }
    }
  }, [])

  return isApplicant ? children : null
}

export default ApplicantAuthWrapper
