import React from "react"
import "./styles.css"
import { Icon } from "@iconify/react"
import About from "../About"
import Doctors from "../Doctors"
import { Helmet } from "react-helmet"

//Landing Page
function Home() {
  return (
    <>
      <Helmet>
        <title>Clinic | Home</title>
        <meta
          name="description"
          content="Clinic... search all for your health"
        />
      </Helmet>
      <section className="first-section">
        <figure className="first-section-card">
          <h4>SEARCH ALL FOR YOUR HEALTH</h4>
          <ul className="first-section-card-list">
            <li>
              <Icon icon="healthicons:doctor-outline" />
            </li>
            <li>
              <Icon icon="healthicons:health-data-security" />
            </li>
            <li>
              <Icon icon="medical-icon:i-laboratory" />
            </li>
            <li>
              <Icon icon="fluent:heart-pulse-20-filled" />
            </li>
          </ul>
          <a className="button" href="#doctors">
            read more
          </a>
        </figure>
      </section>
      <Doctors />
      <About />
    </>
  )
}

export default Home
