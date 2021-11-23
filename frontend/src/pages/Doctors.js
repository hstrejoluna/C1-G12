import React from 'react'
import DoctorsSVG from '../images/doctors 1.png'
import Heart from '../images/heart-g09089e836_640 1.png'
function Doctors() {
    return (
        <section className="operation3">
            <h3 className="dr3"> MEET OUR DOCTORS </h3> 

            <div className="box3-1">
                <p className="txt3">
                    Know our doctors and choose a date for your appointment
                </p>
                <img 
                    alt="doctors" 
                    src={DoctorsSVG} 
                    style={{
                        width:"300px", height:"200px"
                    }}/>
            </div>

            <div className="box3-1">
                <img 
                    alt="heart"
                    src={Heart} 
                    className="heart" 
                    style={{
                        width:"200px", 
                        height:"150px"
                    }}
                />
                <p className="txt3">
                    You can take a turn and pay during your appointment
                </p>
            </div>

            <div className="box3-2">
            <button className="btn3">See more</button>
            </div>

        </section>
    )
}

export default Doctors
