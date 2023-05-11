import { React, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

const EmployerAuthWrapper = ({ children }) => {
  const [isEmployer, setIsEmployer] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const decodedToken = jwt_decode(token)
      if (decodedToken && decodedToken.accountType === "employer") {
        setIsEmployer(true)
      }
    }
  }, [])

  return isEmployer ? children : null
}

export default EmployerAuthWrapper
