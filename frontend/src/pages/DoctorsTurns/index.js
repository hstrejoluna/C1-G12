import { useState } from "react"
import { users } from "../../dummybd"
import "./styles.css"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useQuery } from "@apollo/client"
import { queryAllDoctors } from "../../config/queries"
import { useEffect } from "react"

//Componente donde se veran los doctores disponibles y podrás seleccionar con quien tomar un turno si estas logueado
export default function DoctorsTurns() {
  const { isLogged, setIsLogged, userId, setUserId } = useContext(UserContext)
  const [doctors, setDoctors] = useState([])
  const { data, loading, errors } = useQuery(queryAllDoctors)

  useEffect(() => {
    if (loading) return
    if (!data) return
    console.log(data)
    setDoctors(data.alldoctors)
  }, [loading, data])
  return (
    <>
      <Helmet>
        <title>Clinic | Meet Our Doctors</title>
        <meta name="description" content="Meet our doctors and take a turn " />
      </Helmet>
      <section className="OurDoctors">
        <h2>doctors</h2>
        {loading ? <section className="list-turns"></section> : ""}
        <section className="list-turns">
          {!doctors && !doctors.length
            ? ""
            : doctors.map((doctor) => (
                <figure key={doctor.user.id}>
                  <h2>
                    {doctor.name} {doctor.surname}
                  </h2>
                  <span>{doctor.speciality}</span>
                  <Link
                    to={`${isLogged ? "/Turn" : "/Login"}`}
                    className="button"
                    onClick={() => {
                      localStorage.setItem("comingTurn", 1)
                      localStorage.setItem(
                        "doctorSelected",
                        JSON.stringify(doctor.user.id)
                      )
                    }}
                  >
                    Take turn
                  </Link>
                </figure>
              ))}
        </section>
      </section>
    </>
  )
}
