import { Icon } from "@iconify/react"
import { users } from "../../dummybd"
import { useContext, useEffect, useState } from "react"
import "./styles.css"
import { Link, Redirect } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

export default function Dashboard() {
  const { userId, isLogged } = useContext(UserContext)
  const [user] = useState(() => {
    console.log(userId)
    const filterUser = users.filter((user) => user.id === userId)
    console.log(filterUser)
    return filterUser ? filterUser[0] : {}
  })
  const [usersState, setUsersState] = useState(() => {
    if (!user) return []
    if (user.type === "admin")
      return users.filter((user) => user.type !== "admin")
    else if (user.type === "pacient" || user.type === "doctor")
      return users.filter((user) => user.id === userId)
  })
  const [search, setSearch] = useState("")
  const [usersSearched, setUsersSearched] = useState(() => {
    if (!user) return []
    if (user.type === "admin")
      return users.filter((user) => user.type !== "admin")
    else if (user.type === "pacient" || user.type === "doctor")
      return users.filter((user) => user.id === userId)
  })

  useEffect(() => {
    if (!userId) {
    }
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searched = usersState.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.surname.toLowerCase().includes(search.toLowerCase())
    )
    setUsersSearched(searched)
  }

  if (!isLogged) return <Redirect to="/" />
  if (!user) return <section className="dashboard"></section>
  else if (user)
    return (
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
    )
}
