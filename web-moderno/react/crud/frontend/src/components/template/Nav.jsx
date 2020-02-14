import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            {/* refatorar */}
            <NavItem navLink="/" navIcon="home" navText="Início"/>
            <NavItem navLink="/users" navIcon="users" navText="Usuários"/>
            {/* <a href="#/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="#/users">
                <i className="fa fa-users"></i> Usuários
            </a> */}
        </nav>
    </aside>