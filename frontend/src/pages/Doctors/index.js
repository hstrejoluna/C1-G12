import React from "react"
import DoctorsSVG from "../../images/doctors 1.png"
import Heart from "../../images/heart-g09089e836_640 1.png"
import "./styles.css"
import { Link } from "react-router-dom"

// Componente de la seccion donde se habla un poco sobre los doctores y los turnos
function Doctors() {
  return (
    <section className="third-section">
      <h3> MEET OUR DOCTORS </h3>

      <div className="third-section-container">
        <div className="third-section-container_container">
          <h4>Know our doctors and choose a date for your appointment</h4>
        </div>
        <div className="third-section-container_container">
          <img
            alt="doctors"
            className="doctors-animate"
            src={DoctorsSVG}
            // style={{
            //   width: "295px",
            //   height: "209px",
            //   margin: "auto",
            // }}
          />
        </div>
      </div>

      <div className="third-section-container">
        <div className="third-section-container_container">
          <img
            className="heart"
            alt="heart"
            src={Heart}
            // style={{
            //   width: "147px",
            //   height: "133px",
            // }}
          />
        </div>
        <div className="third-section-container_container">
          <h2>You can take a turn without come to the clinic</h2>
        </div>
      </div>

      <Link to="/OurDoctors" className="button">
        See Doctors
      </Link>
    </section>
  )
}

export default Doctors
