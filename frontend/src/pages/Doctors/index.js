import React from 'react'
import DoctorsSVG from '../../images/doctors 1.png'
import Heart from '../../images/heart-g09089e836_640 1.png'
import './styles.css'

function Doctors() {
    return (
        <section className="third-section">
            <h3> MEET OUR DOCTORS </h3> 

            <div className="third-section-container">
                <div className="third-section-container_container">
                <h4>
                    Know our doctors and choose a date for your appointment
                </h4>
                </div>
                <div className="third-section-container_container">
                    <img 
                        alt="doctors" 
                        src={DoctorsSVG} 
                        style={{
                            width: "295px", 
                            height: "209px",
                            margin: "auto"
                        }}
                    />
                </div>
            </div>

            <div className="third-section-container">
                <div className="third-section-container_container">
                    <img 
                        alt="heart"
                        src={Heart} 
                        style={{
                            width:"147px", 
                            height:"133px"
                        }}
                    />
                </div>
                <div className="third-section-container_container">
                    <h2>
                        You can take a turn and pay during your appointment
                    </h2>
                </div>
            </div>

            <button className="button">See more</button>
        </section>
    )
}

export default Doctors
