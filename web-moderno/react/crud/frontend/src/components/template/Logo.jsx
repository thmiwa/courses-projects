import './Logo.css'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

// componentes funcionais
export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>
    </aside>