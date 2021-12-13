import { Formik, Form, Field, ErrorMessage } from "formik"
import "./index.css"
import { users } from "../../dummybd"
import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useMutation } from "@apollo/client"
import { queryCreatePatient } from "../../config/queries"

// async function register(info) {
//   const isUser = await users.find((userIn) => userIn.email === info.email)
//   const messageError = { err: "usuario no válido" }
//   if (isUser) return new Error(messageError)
//   const ids = await users.map(({ id }) => id)
//   const newUser = { id: Math.max(...ids) + 1, type: "pacient", ...info }
//   return newUser
// }

export default function Register() {
  const comingTurn = localStorage.getItem("comingTurn") ? true : false
  const [createPacient, result] = useMutation(queryCreatePatient)
  const { isLogged, setIsLogged, userId, setUserId } = useContext(UserContext)
  const history = useHistory()
  const newLocation = comingTurn ? "/Turn" : "/Dashboard"

  useEffect(() => {
    if (!result.data || result.loading) return
    const { id, firstName, lastName, isPatient, isDoctor, isSysadmin } =
      result.data.createpatient.user
    console.log(result)
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: firstName,
        surname: lastName,
        type: isPatient
          ? "pacient"
          : isDoctor
          ? "doctor"
          : isSysadmin
          ? "admin"
          : "",
      })
    )
    localStorage.setItem("userId", JSON.stringify(id))
    setUserId(id)
    setIsLogged(true)
    history.push(newLocation)
  }, [result.data])
  return (
    <>
      <Helmet>
        <title>Clinic | Register</title>
        <meta name="description" content="Register in the Clinic" />
      </Helmet>
      <section className="Register">
        <h1>Register</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: "",
            dni: "",
            name: "",
            surname: "",
            age: "",
            gender: "",
            phone: "",
            socialWork: "none",
            medicalPlan: "none",
          }}
          onSubmit={(values, { setFieldErrors }) => {
            createPacient({
              variables: {
                name: values.name,
                surname: values.surname,
                password1: values.password,
                password2: values.passwordConfirmation,
                email: values.email,
                dni: values.dni,
                age: values.age,
                gender: values.gender,
                phone: values.phone,
                social: values.socialWork,
                plan: values.medicalPlan,
              },
            })
          }}
          validate={(values) => {
            const errors = {}

            if (!values.email) errors.email = "email is required"
            if (!values.password) errors.password = "password is required"
            else if (values.password < 3)
              errors.password =
                "password is better with more of three characters"
            if (values.passwordConfirmation !== values.password)
              errors.passwordConfirmation = "the passwords no coinciden"
            if (!values.dni) errors.dni = "dni is required"
            if (!values.name) errors.name = "name is required"
            if (!values.surname) errors.surname = "surname is required"
            if (!values.age) errors.age = "age is required"
            if (values.gender === "none") errors.gender = "gender is required"
            if (!values.phone) errors.phone = "phone is required"

            return errors
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className="form">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <label htmlFor="passwordConfirmation">Password Confirm</label>
              <Field name="passwordConfirmation" type="password" />
              <label htmlFor="dni">DNI</label>
              <Field name="dni" type="text" />
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <label htmlFor="surname">Surname</label>
              <Field name="surname" type="text" />
              <label htmlFor="age">Age</label>
              <Field name="age" type="date" />
              <label htmlFor="gender">Gender</label>
              <Field name="gender" as="select">
                <option value="none">None</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </Field>
              <label htmlFor="phone">Phone</label>
              <Field name="phone" type="text" />
              <label htmlFor="socialWork">Social Work</label>
              <Field name="socialWork" as="select">
                <option value="none">None</option>
                <option value="osde">Osde</option>
                <option value="sadop">Sadop</option>
              </Field>
              <label htmlFor="medicalPlan">Medical Plan</label>
              <Field name="medicalPlan" as="select">
                <option value="none">None</option>
                <option value="pami">Pami</option>
                <option value="swiss">Swiss Medical</option>
              </Field>
              <button type="submit" className="button">
                Send
              </button>
              {console.log(errors)}
            </Form>
          )}
        </Formik>
      </section>
    </>
  )
}
