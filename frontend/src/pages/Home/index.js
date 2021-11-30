import React from 'react'
import './styles.css'
import {Icon} from '@iconify/react'
import Bot from '../../components/Bot'

function Home() {
    return (
        <section className="first-section">
            <figure className="first-section-card">
                <h4>
                    SEARCH ALL FOR YOUR HEALTH
                </h4>
                <ul className="first-section-card-list">
                    <li><Icon icon='healthicons:doctor-outline' /></li>
                    <li><Icon icon='healthicons:health-data-security' /></li>
                    <li><Icon icon='medical-icon:i-laboratory' /></li>
                    <li><Icon icon='fluent:heart-pulse-20-filled' /></li>
                </ul>
                <Bot/>
                <button className="button">
                    read more
                </button>
            </figure>
        </section>
    )
}

export default Home
