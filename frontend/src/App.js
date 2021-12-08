import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Doctors from "./pages/Doctors"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import LoginPage from "./pages/Login"
import DoctorsTurns from "./pages/DoctorsTurns"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import UserContextProvider from "./context/UserContext"
import ViewUser from "./pages/ViewUser"

function App() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Doctors" exact component={Doctors} />
            <Route path="/About" exact component={About} />
            <Route path="/Login" exact component={LoginPage} />
            <Route path="/OurDoctors" exact component={DoctorsTurns} />
            <Route path="/Register" exact component={Register} />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Dashboard/:userName" exact component={ViewUser} />
          </Switch>
          <Footer />
        </Router>
      </UserContextProvider>
    </>
  )
}

export default App
