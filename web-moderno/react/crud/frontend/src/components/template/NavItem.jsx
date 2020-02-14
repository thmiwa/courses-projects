import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <Link to={props.navLink}>
        <i className={`fa fa-${props.navIcon}`}></i> {props.navText}
    </Link>
