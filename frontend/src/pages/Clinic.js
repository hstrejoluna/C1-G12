import React from 'react'
import DoctorFemale from '../images/doctor5 1.png'

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

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top navbar-dark bg-dark">
            <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <svg className="bi" width="30" height="24"></svg>
            </a>
            <span className="text-muted">
                © 2021 Company, Inc
            </span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                    <a className="text-muted" href="##">
                        <svg className="bi" width="24" height="24">
                            <use></use>
                        </svg>
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-muted" href="##">
                        <svg className="bi" width="24" height="24">
                            <use></use>
                        </svg>
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-muted" href="##">
                        <svg className="bi" width="24" height="24">
                            <use></use>
                        </svg>
                    </a>
                </li>
            </ul>
        </footer>
        </section>
    )
}

export default Clinic
