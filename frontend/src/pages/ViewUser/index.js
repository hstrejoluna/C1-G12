import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import { users, turns } from "../../dummybd"
import "./index.css"
import { Helmet } from "react-helmet"
import { useLazyQuery } from "@apollo/client"
import {
  querySearchUser,
  querySearchAppointmentsPacient,
  querySearchAppointmentsDoctor,
} from "../../config/queries"
import { UserContext } from "../../context/UserContext"

export default function ViewUser() {
  const { changes, setChanges } = useContext(UserContext)
  const [type, setType] = useState("")
  const { idUserParam } = useParams()
  const [findUser, result] = useLazyQuery(querySearchUser)
  const [findAppointDoctor, doctorAppoint] = useLazyQuery(
    querySearchAppointmentsDoctor
  )
  const [findAppointPacient, pacientAppoint] = useLazyQuery(
    querySearchAppointmentsPacient
  )
  let [user, setUser] = useState(null)
  const [appoints, setAppoints] = useState([])

  useEffect(() => {
    findUser({ variables: { idUser: idUserParam } })
  }, [])

  useEffect(() => {
    if (result.loading || !result.data) return
    console.log("user", result.data.searchuser[0])
    setUser(result.data.searchuser[0])
  }, [result.loading, result.data])

  useEffect(() => {
    if (!user) return
    if (user.isDoctor) setType("doctor")
    else if (user.isPatient) setType("pacient")
  }, [user])

  useEffect(() => {
    if (type === "") return
    changes && setChanges(false)
    if (type === "pacient")
      return findAppointPacient({
        variables: { idPatient: parseInt(idUserParam) },
      })
    else
      return findAppointDoctor({
        variables: { idDoctor: parseInt(idUserParam) },
      })
  }, [type, changes])

  useEffect(() => {
    // if (!doctorAppoint.data || doctorAppoint.loading) return
    // if (doctorAppoint.data === undefined) console.log(doctorAppoint)
    if (!doctorAppoint.data) return
    console.log("doctorAppoint", doctorAppoint.data.allappointfordoctor)
    setAppoints(doctorAppoint.data.allappointfordoctor)
  }, [doctorAppoint.data])

  useEffect(() => {
    if (!pacientAppoint.data) return
    console.log("pacientAppoint", pacientAppoint.data.allappointforpatient)
    setAppoints(pacientAppoint.data.allappointforpatient)
  }, [pacientAppoint.data])

  if (!user)
    return (
      <>
        {" "}
        <Helmet>
          <title>Clinic | {idUserParam}</title>
          <meta name="description" content={`turns of ${idUserParam}`} />
        </Helmet>
        <section className="user-view"></section>
      </>
    )

  return (
    <>
      <Helmet>
        <title>Clinic | {idUserParam}</title>
        <meta name="description" content={`turns of ${idUserParam}`} />
      </Helmet>
      <section className="user-view">
        <div className="user-view_container-name">
          <h1>
            {user.type} {user.name} {user.surname}
          </h1>
        </div>
        <div className="user-view_container-title">
          <h2>Turns</h2>
        </div>
        <ul>
          {!appoints.length ? (
            <li>don't have appointments</li>
          ) : (
            appoints.map((appoint) => (
              <li key={appoint.id}>
                <span>
                  pacient: {appoint.Patient.name} {appoint.Patient.surname}
                </span>
                <span>
                  doctor: {appoint.Doctor.name} {appoint.Doctor.surname}
                </span>
                <span>date: {appoint.Date}</span>
                <span>time: {appoint.Time}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  )
}
