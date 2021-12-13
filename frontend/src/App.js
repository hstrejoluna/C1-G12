import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import LoginPage from "./pages/Login"
import DoctorsTurns from "./pages/DoctorsTurns"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import UserContextProvider from "./context/UserContext"
import ViewUser from "./pages/ViewUser"
import Turn from "./pages/Turn"
function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={LoginPage} />
            <Route path="/OurDoctors" exact component={DoctorsTurns} />
            <Route path="/Register" exact component={Register} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Dashboard/:idUserParam" exact component={ViewUser} />
            <Route path="/Turn" component={Turn} />
          </Switch>
          <Footer />
        </Router>
      </UserContextProvider>
    </>
  )
}

export default App
