
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clinic from './pages/Clinic';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Doctors" exact component={Doctors} />
        <Route path="/Clinic" exact component={Clinic} />
      </Switch>
      <Footer/>
      </Router>
    </>
  );
}

export default App;
