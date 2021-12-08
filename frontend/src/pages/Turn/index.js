import { useContext, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import "./styles.css"
import { UserContext } from "../../context/UserContext"
import { users } from "../../dummybd"

export default function Turn() {
  const { userId } = useContext(UserContext)
  const [isSend, changeIsSend] = useState(false)
  const [doctors, setDoctors] = useState(() => {
    const doctorsFiltered = users.filter((user) => user.type === "doctor")
    return doctorsFiltered
  })
  return (
    <section className="turn">
      <h1>Fill in the field and take a turn</h1>
      <Formik
        initialValues={{
          date: "",
          time: "",
          doctor: "",
          pacient: userId,
        }}
        validate={(values) => {
          let errors = {}

          //validacion nombre
          if (!values.doctor) {
            errors.doctor = "Please select one doctor"
          }
          //validacion hora
          if (!values.time) {
            errors.time = "Please select one hour"
          }
          //validacion fecha
          if (!values.date) {
            errors.date = "Please select one date"
          }
          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm()
          console.log(values)
          changeIsSend(true)
          setTimeout(() => changeIsSend(false), 5000)
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <label htmlFor="date">Date</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="small" />
            <label htmlFor="time">Time</label>
            <Field type="time" name="time" />
            <ErrorMessage name="time" component="small" />
            <Field type="hidden" name="pacient" />
            <label htmlFor="doctor">Doctor</label>
            <Field as="select" name="doctor">
              <option value="">--</option>
              {doctors.map((doctor) => (
                <option value={doctor.id}>
                  {doctor.name} {doctor.surname}
                </option>
              ))}
            </Field>
            <ErrorMessage name="doctor" component="small" />
            <button type="submit" className="button">
              Enviar
            </button>
            {isSend && <p>Formulario enviado con éxito!</p>}
          </Form>
        )}
      </Formik>
    </section>
  )
}
