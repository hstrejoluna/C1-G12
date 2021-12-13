import { useContext, useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import "./styles.css"
import { UserContext } from "../../context/UserContext"
import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { queryAllDoctors, queryCreateAppointment } from "../../config/queries"

export default function Turn() {
  const [createAppointment, result] = useMutation(queryCreateAppointment)
  const [today] = useState(() => {
    const date = new Date().toLocaleDateString().split("/").reverse()
    const year = date[0]
    const month = date[1]
    const day = date[2]
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`
  })
  const history = useHistory()
  const { userId, setChanges, changes } = useContext(UserContext)
  const [doctors, setDoctors] = useState([])
  const { data, loading, errors } = useQuery(queryAllDoctors)
  const [doctorSelected, setDoctorSelected] = useState(null)

  useEffect(() => {
    if (!doctors.length || !doctors) return
    const doctorInLocal = localStorage.getItem("doctorSelected")
      ? JSON.parse(localStorage.getItem("doctorSelected"))
      : null
    const theDoctor = doctors.filter(
      (doctor) => doctor.user.id === doctorInLocal
    )
    console.log("the doctor", theDoctor)
    setDoctorSelected(theDoctor[0])
  }, [doctors, setDoctorSelected])

  useEffect(() => {
    if (loading) return
    if (!data) return
    console.log(data)
    setDoctors(data.alldoctors)
  }, [loading, data])

  console.log("doctorSelected", doctorSelected)
  if (!doctorSelected || !doctorSelected.user)
    return (
      <>
        <Helmet>
          <title>Clinic | Turn</title>
          <meta name="description" content="Take a turn with our doctor" />
        </Helmet>
        <section className="turn">
          <h1>Fill in the field and take a turn</h1>
        </section>
      </>
    )

  return (
    <>
      <Helmet>
        <title>Clinic | Turn</title>
        <meta name="description" content="Take a turn with our doctor" />
      </Helmet>
      <section className="turn">
        <h1>Fill in the field and take a turn</h1>
        <Formik
          initialValues={{
            date: today,
            time: "08:00",
            doctor: doctorSelected ? doctorSelected.user.id : "",
            pacient: JSON.stringify(userId),
          }}
          validate={(values) => {
            let errors = {}
            let timeSplit = values.time.split(":")
            let hour = parseInt(timeSplit[0])
            let minutes = parseInt(timeSplit[1])
            //validacion doctor
            if (!values.doctor) {
              errors.doctor = "Please select one doctor"
            }
            //validacion hora
            if (!values.time) {
              errors.time = "Please select one hour"
            }
            if (hour > 19) {
              values.time = "19:00"
            } else if (hour < 8) {
              values.time = "08:00"
            }

            if (minutes !== 30 && minutes !== 0) {
              values.time = `${hour}:00`
            }
            //validacion fecha
            if (!values.date) {
              errors.date = "Please select one date"
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            const { date, time, doctor, pacient } = values
            console.log({
              date,
              time,
              doctor: parseInt(JSON.parse(doctor)),
              pacient: parseInt(JSON.parse(pacient)),
            })
            localStorage.removeItem("doctorSelected")
            localStorage.removeItem("comingTurn")
            createAppointment({
              variables: {
                Date: date,
                Time: time,
                idDoctor: parseInt(JSON.parse(doctor)),
                idPatient: parseInt(JSON.parse(pacient)),
              },
            })
            console.log(result)
            setChanges(true)
            history.push("/OurDoctors")
          }}
        >
          {({ errors }) => (
            <Form className="formulario form">
              <label htmlFor="date">Date</label>
              <Field type="date" min={today} max="2022-12-31" name="date" />
              <ErrorMessage name="date" component="small" />
              <label htmlFor="time">Time</label>
              <Field type="time" name="time" min="08:00" max="19:00" />
              <ErrorMessage name="time" component="small" />
              <Field type="hidden" name="pacient" />
              <label htmlFor="doctor">Doctor</label>
              <Field as="select" name="doctor">
                <option value="">--</option>
                {doctors.map((doctor) => (
                  <option key={doctor.user.id} value={doctor.user.id}>
                    {doctor.name} {doctor.surname}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="doctor" component="small" />
              <button type="submit" className="button">
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  )
}
