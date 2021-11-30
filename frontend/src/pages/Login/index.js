import { Formik, Form, Field, ErrorMessage } from "formik"
import { users } from "../../dummybd"
import "./styles.css"
import { useHistory } from "react-router-dom"

async function login(email, password) {
  const user = await users.find((userIn) => userIn.email === email)
  const messageError = { err: "usuario y/o contraseña invalidos" }

  if (!user) return messageError
  const passOk = user.password === password

  if (passOk) return user
  else return messageError
}

export default function LoginPage() {
  const history = useHistory()
  return (
    <section className="Login-Page">
      <h1>Welcome To Clinic</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          all: "",
        }}
        onSubmit={(values, { setFieldError }) => {
          console.log(values)
          return login(values.email, values.password)
            .then((res) => {
              console.log(res)
              if (res.err) return Promise.reject(res.err)
              return history.push("/Admin")
            })
            .catch((err) => {
              setFieldError("all", err)
              console.error(err)
            })
        }}
        validate={(values) => {
          const errors = {}
          if (!values.email) {
            errors.email = "email is required"
          }
          if (!values.password) {
            errors.password = "password is required"
          } else if (values.password.length < 3) {
            errors.email = "password length is better with more 3 characters"
          }
          return errors
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              style={
                errors.email ? { outlineColor: "red" } : { outlineColor: "" }
              }
            />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <button className="button" type="submit" disabled={isSubmitting}>
              Enviar
            </button>
            {console.log(errors)}
            <ErrorMessage name="all" component="small" />
          </Form>
        )}
      </Formik>
    </section>
  )
}
