import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { users, turns } from "../../dummybd"
import "./index.css"

export default function ViewUser() {
  const { userName } = useParams()
  const [user, setUser] = useState(() => {
    const find = users.filter(
      (usr) => `${usr.name} ${usr.surname}` === decodeURI(userName)
    )
    if (find) return find[0]
    else return {}
  })
  const [appoints, setAppoints] = useState(() => {
    return turns.filter((appoint) => appoint[user.type] === user.id)
  })

  console.log(user)
  console.log(appoints)
  return (
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
  )
}
