import { useState } from "react"
import { users } from "../../dummybd"
import "./styles.css"
import { Link } from "react-router-dom"
export default function DoctorsTurns() {
  const [doctors, setDoctors] = useState(
    users.filter((user) => user.type === "doctor" && user.active)
  )

  return (
    <section className="OurDoctors">
      <h2>doctors</h2>
      <section className="list-turns">
        {doctors.map((doctor) => (
          <figure>
            <h2>
              {doctor.name} {doctor.surname}
            </h2>
            <span style={{ color: "#494747" }}>{doctor.specialty}</span>
            <Link to="/Turn" className="button">
              Take turn
            </Link>
          </figure>
        ))}
      </section>
    </section>
  )
}
