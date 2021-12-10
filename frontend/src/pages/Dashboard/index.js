import { Icon } from "@iconify/react"
import { users } from "../../dummybd"
import { useContext, useEffect, useState } from "react"
import "./styles.css"
import { Link, Redirect } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Helmet } from "react-helmet"

//Componente para el manejo de datos del usuario o usuarios en caso del admin
export default function Dashboard() {
  //estado globlal id de usuario logueado y saber si lo esta
  const { userId, isLogged } = useContext(UserContext)
  //Sacando el usuario que esta logeado por su id
  const [user] = useState(() => {
    const filterUser = users.filter((user) => user.id === userId)
    if (filterUser.length) return filterUser[0]
    return JSON.parse(localStorage.getItem("userRegister"))
  })
  //Usuarios disponibles para ver en el dashboard
  const [usersState] = useState(() => {
    if (!user) return []
    let usersFiltered
    if (user.type === "admin") {
      usersFiltered = users.filter((user) => user.type !== "admin")
      if (localStorage.getItem("userRegister")) {
        usersFiltered.push(JSON.parse(localStorage.getItem("userRegister")))
      }
      return usersFiltered
    } else if (user.type === "pacient" || user.type === "doctor") {
      usersFiltered = users.filter((user) => user.id === userId)
      if (localStorage.getItem("userRegister")) {
        usersFiltered.push(JSON.parse(localStorage.getItem("userRegister")))
      }
      return usersFiltered
    }
  })
  const [search, setSearch] = useState("") //Busqueda de usuarios

  //Usuarios que se mostraran en el dashboar despues de una búsqueda
  const [usersSearched, setUsersSearched] = useState(() => {
    if (!user) return []
    let usersFiltered
    if (user.type === "admin") {
      usersFiltered = users.filter((user) => user.type !== "admin")
      if (localStorage.getItem("userRegister")) {
        usersFiltered.push(JSON.parse(localStorage.getItem("userRegister")))
      }
      return usersFiltered
    } else if (user.type === "pacient" || user.type === "doctor") {
      usersFiltered = users.filter((user) => user.id === userId)
      if (localStorage.getItem("userRegister")) {
        usersFiltered.push(JSON.parse(localStorage.getItem("userRegister")))
      }
      return usersFiltered
    }
  })

  //Manejo del submit en search
  const handleSubmit = (e) => {
    e.preventDefault()
    //creamos un array de todas las coincidencias de lo buscado y cambiamos el estado de usersSearched
    const searched = usersState.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.surname.toLowerCase().includes(search.toLowerCase())
    )
    setUsersSearched(searched)
  }

  //Si no esta logueado no podra ver nada entonces se lo redirige al inicio
  if (!isLogged) return <Redirect to="/" />

  return (
    <>
      <Helmet>
        <title>Clinic | Dashboard</title>
        <meta name="description" content="See your dates" />
      </Helmet>
      <section className="dashboard">
        {user.type === "admin" ? (
          <form className="dashboard_search-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              placeholder="Search name or surname"
            />
            <button>
              <Icon icon="bx:bx-search-alt-2" />
            </button>
          </form>
        ) : (
          ""
        )}
        <ul className="dashboard_list-doctors">
          {usersSearched.length ? (
            usersSearched.map((doctor) => (
              <Link to={`/Dashboard/${doctor.name}%20${doctor.surname}`}>
                <li key={doctor.id} className="dashboard_card">
                  <span>
                    {doctor.type === "doctor" ? "Dr." : "Pacient"} {doctor.name}{" "}
                    {doctor.surname}
                  </span>
                </li>
              </Link>
            ))
          ) : (
            <span>0 Resultados para "{search}"</span>
          )}
        </ul>
      </section>
    </>
  )
}
