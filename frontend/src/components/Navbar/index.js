import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="nav">
      <Link className="navbar-brand" to="/">
        Clinic
      </Link>
      <ul className="nav-container-items">
        <Link className=" nav-item nav-link active" aria-current="page" to="/">
          Home
        </Link>
        <Link className="nav-item nav-link" to="/Doctors">
          Doctors
        </Link>
        <Link className="nav-item nav-link" to="/About">
          About
        </Link>
      </ul>
      <Link className="btn btn-outline-success" to="/Login">
        Login
      </Link>
    </nav>
  )
}

export default Navbar
