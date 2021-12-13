import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

function Navbar() {
  const { isLogged, setIsLogged, setUserId } = useContext(UserContext)
  return (
    <nav className="nav">
      <Link className="navbar-brand" to="/">
        Clinic
      </Link>
      <ul className="nav-container-items">
        <Link className=" nav-item nav-link active" aria-current="page" to="/">
          Home
        </Link>
        {isLogged && (
          <Link className="nav-item nav-link" to="/Dashboard">
            Dashboard
          </Link>
        )}
      </ul>
      {!isLogged ? (
        <Link className="btn btn-outline-success" to="/Login">
          Login
        </Link>
      ) : (
        <button
          className="btn btn-outline-success"
          onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRegister")
            setIsLogged(false)
            setUserId("")
          }}
        >
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar
