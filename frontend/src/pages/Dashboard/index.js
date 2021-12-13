import { Icon } from "@iconify/react"
import { users } from "../../dummybd"
import { useContext, useEffect, useState } from "react"
import "./styles.css"
import { Link, Redirect } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Helmet } from "react-helmet"
import { queryAllPatients, queryAllDoctors } from "../../config/queries"
import { useQuery } from "@apollo/client"

//Componente para el manejo de datos del usuario o usuarios en caso del admin
export default function Dashboard() {
  //estado globlal id de usuario logueado y saber si lo esta
  const { userId, isLogged } = useContext(UserContext)
  //Sacando el usuario que esta logeado por su id
  const [user] = useState(() => {
    if (isLogged && localStorage.getItem("user"))
      return JSON.parse(localStorage.getItem("user"))
    else return null
  })
  //Usuarios disponibles para ver en el dashboard
  const { loading: loadingPatients, data: patients } =
    useQuery(queryAllPatients)
  const { loading: loadingDoctors, data: doctors } = useQuery(queryAllDoctors)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("") //Busqueda de usuarios

  //Usuarios que se mostraran en el dashboar despues de una búsqueda
  const [usersSearched, setUsersSearched] = useState([])

  useEffect(() => {
    if (loadingPatients) return
    console.log("patients", patients)
    if (user.type === "admin") {
      setUsers((prev) => prev.concat(patients.allpatients))
      setUsersSearched((prev) => prev.concat(patients.allpatients))
    } else if (user.type === "pacient") {
      setUsers(
        patients.allpatients.filter((patient) => patient.user.id == userId)
      )
      setUsersSearched(
        patients.allpatients.filter((patient) => patient.user.id == userId)
      )
    }
  }, [loadingPatients])

  useEffect(() => {
    if (loadingDoctors) return
    console.log("doctors", doctors)
    if (user.type === "admin") {
      setUsers((prev) => prev.concat(doctors.alldoctors))
      setUsersSearched((prev) => prev.concat(doctors.alldoctors))
    } else if (user.type === "doctor") {
      setUsers(doctors.alldoctors.filter((doctor) => doctor.user.id == userId))
      setUsersSearched(
        doctors.alldoctors.filter((doctor) => doctor.user.id == userId)
      )
    }
  }, [loadingDoctors])

  //Manejo del submit en search
  const handleSubmit = (e) => {
    e.preventDefault()
    //creamos un array de todas las coincidencias de lo buscado y cambiamos el estado de usersSearched
    const searched = users.filter(
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
              <Link key={doctor.user.id} to={`/Dashboard/${doctor.user.id}`}>
                <li className="dashboard_card">
                  <span>
                    {doctor.user.isDoctor
                      ? "Dr."
                      : doctor.user.isPatient
                      ? "Pacient"
                      : ""}{" "}
                    {doctor.name} {doctor.surname}
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
