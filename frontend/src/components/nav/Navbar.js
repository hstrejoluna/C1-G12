import React from 'react'
import {link} from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
    <nav className="nav">
      <Link className="navbar-brand" href="/">
        Clinic
      </Link>
        <ul className="nav-container-items">
          <Link className=" nav-item nav-link active" aria-current="page" to="/" >Home</Link>
          <Link className="nav-item nav-link" to="/Doctors">Doctores</Link>
          <Link  className="nav-item nav-link" to="/Clinic">Clinica</Link>
          </ul>
          <button className="btn btn-outline-success" type="submit">Login</button>
  </nav>    
    )
}

export default Navbar
