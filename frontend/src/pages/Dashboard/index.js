import { Icon } from "@iconify/react"
import { users } from "../../dummybd"
import { useState } from "react"
import "./styles.css"
export default function Dashboard() {
  const [doctors] = useState(users.filter((user) => user.type === "doctor"))
  const [search, setSearch] = useState("")
  const [usersSearched, setUsersSearched] = useState(
    users.filter((user) => user.type === "doctor")
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searched = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.surname.toLowerCase().includes(search.toLowerCase())
    )
    setUsersSearched(searched)
  }

  return (
    <section className="dashboard">
      <form className="dashboard_search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          placeholder="Search doctor name"
        />
        <button>
          <Icon icon="bx:bx-search-alt-2" />
        </button>
      </form>
      <ul className="dashboard_list-doctors">
        {usersSearched.length ? (
          usersSearched.map((doctor) => (
            <li key={doctor.id} className="dashboard_card">
              <span>
                Dr. {doctor.name} {doctor.surname}
              </span>
            </li>
          ))
        ) : (
          <span>0 Resultados para "{search}"</span>
        )}
      </ul>
    </section>
  )
}
