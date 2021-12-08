import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(() =>
    localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : null
  )
  const [isLogged, setIsLogged] = useState(() =>
    localStorage.getItem("userId") ? true : false
  )

  return (
    <UserContext.Provider value={{ userId, setUserId, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  )
}
