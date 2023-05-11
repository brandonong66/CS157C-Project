import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Navbar2 from "./components/Navbar2"
import Jobs from "./pages/Jobs/Jobs"
import Job from "./pages/Job"
import MyJobs from "./pages/MyJobs"
import Navbar3 from "./components/Navbar3"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar3 />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:jobId" element={<Job />} />
          <Route path="/myjobs" element={<MyJobs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
