import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React from 'react'
// import { HashRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
// import Home from '../components/home/Home'
import Routes from './Routes'
import Footer from '../components/template/Footer'

export default props => 
    // <HashRouter>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
    {/* </HashRouter> */}