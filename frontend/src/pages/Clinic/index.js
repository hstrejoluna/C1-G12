import React from 'react'
import DoctorFemale from '../../images/doctor5 1.png'

function Clinic() {
    return (
        <section className="operation2">
        <h3> 
            clinic 
        </h3> 

        <div 
            className='box2' 
            style={{
                background:'no-repeat cover',
                backgroundImage:` url('${DoctorFemale}')`
            }}>
            <h3>
                WHY WOULD YOU CHOOSE US 
            </h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </p> 
            <h3> 
                CLINIC 
            </h3>
        </div> 
        </section>
    )
}

export default Clinic
