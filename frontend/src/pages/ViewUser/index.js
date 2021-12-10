import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { users, turns } from "../../dummybd"
import "./index.css"
import { Helmet } from "react-helmet"

export default function ViewUser() {
  const { userName } = useParams()
  let [user] = useState(() => {
    const userFiltered = users.filter(
      (user) => `${user.name} ${user.surname}` === decodeURI(userName)
    )
    if (userFiltered.length) return userFiltered[0]
    const userRegister = JSON.parse(localStorage.getItem("userRegister"))
    return userRegister
  })
  const [appoints] = useState(() => {
    const turnsFiltered = turns.filter(
      (appoint) => appoint[user.type] === user.id
    )
    if (localStorage.getItem("newTurn")) {
      turnsFiltered.push(JSON.parse(localStorage.getItem("newTurn")))
    }
    return turnsFiltered
  })

  console.log(user)
  console.log(appoints)
  return (
    <>
      <Helmet>
        <title>Clinic | {userName}</title>
        <meta name="description" content={`turns of ${userName}`} />
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
                <span>pacient: {appoint.pacient}</span>
                <span>doctor: {appoint.doctor}</span>
                <span>date: {appoint.date}</span>
                <span>time: {appoint.time}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  )
}
