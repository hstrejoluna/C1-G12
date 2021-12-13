import { Formik, Form, Field, ErrorMessage } from "formik"
import { users } from "../../dummybd"
import "./styles.css"
import { useHistory } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { queryLogin } from "../../config/queries"
// async function login(email, password) {
//   let user = await users.find((userIn) => userIn.email === email)
//   const messageError = { err: "usuario y/o contraseña invalidos" }

//   if (!user && localStorage.getItem("userRegister")) {
//     user = await JSON.parse(localStorage.getItem("userRegister"))
//   }
//   if (!user) return messageError
//   const passOk = user.password === password

//   if (passOk) return user
//   else return messageError
// }

export default function LoginPage() {
  const [login, result] = useMutation(queryLogin)
  const { isLogged, setIsLogged, userId, setUserId } = useContext(UserContext)
  const history = useHistory()
  const comingTurn = localStorage.getItem("comingTurn") ? true : false

  useEffect(() => {
    if (!result.data) return
    if (result.data.user === null) return
    const newLocation = comingTurn ? "/Turn" : "/Dashboard"
    const { user, token, success, errors, refreshToken } = result.data.tokenAuth
    console.log({ user, token, success, errors, refreshToken })
    localStorage.setItem("token", JSON.stringify(token))
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.firstName,
        surname: user.lastName,
        type: user.isPatient
          ? "pacient"
          : user.isDoctor
          ? "doctor"
          : user.isSysadmin
          ? "admin"
          : "",
      })
    )
    localStorage.setItem("userId", JSON.stringify(user.pk))
    setIsLogged(true)
    setUserId(user.pk)
    history.push(newLocation)
  }, [result.data])
  return (
    <>
      <Helmet>
        <title>Clinic | Login</title>
        <meta name="description" content="Login in the Clinic" />
      </Helmet>
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
            login({
              variables: { email: values.email, password: values.password },
            })
            // return login(values.email, values.password)
            //   .then((res) => {
            //     const newLocation = comingTurn ? "/Turn" : "/Dashboard"
            //     console.log(res)
            //     if (res.err) return Promise.reject(res.err)
            //     localStorage.setItem("userId", res.id)
            //     setUserId(res.id)
            //     setIsLogged(true)
            //     localStorage.removeItem("comingTurn")
            //     return history.push(newLocation)
            //   })
            //   .catch((err) => {
            //     setFieldError("all", err)
            //     console.error(err)
            //   })
          }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = "email is required"
            }
            if (!values.password) {
              errors.password = "password is required"
            } else if (values.password.length < 3) {
              errors.password =
                "password length is better with more 3 characters"
            }
            return errors
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className="form">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                style={
                  errors.email ? { outlineColor: "red" } : { outlineColor: "" }
                }
              />
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <button className="button" type="submit">
                Login
              </button>
              {console.log(errors)}
              <ErrorMessage name="all" component="small" />
              <ErrorMessage name="email" component="small" />
              <ErrorMessage name="password" component="small" />
            </Form>
          )}
        </Formik>
        <span>
          You don't have a account?{" "}
          <Link to="/Register">
            <small>Register</small>
          </Link>
        </span>
      </section>
    </>
  )
}
