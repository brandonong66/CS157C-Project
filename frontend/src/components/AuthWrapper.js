import React from "react"
import { Navigate } from "react-router-dom"

const AuthWrapper = (WrappedComponent) => {
  return (props) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      return <WrappedComponent {...props} />
    } else {
      return <Navigate to="/login" replace />
    }
  }
}

export default AuthWrapper
