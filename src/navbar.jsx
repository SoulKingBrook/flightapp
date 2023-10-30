import React from 'react'
import badge from "./images/badge.png"
import { Link } from 'react-router-dom';
import "./index.css"
import "./navbar.css"
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
    const [username, setUsername] = useState(null)


    document.addEventListener('localdatachanged', () => {
        setUsername(localStorage.getItem("sessionUser"))
    });

    useEffect(() => {
        setUsername(localStorage.getItem("sessionUser"))
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("sessionUser")
        setUsername(null)

    }
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/">
                    <img src={badge} alt='' />
                </Link>
            </div>
            <div className="right">
                <Link to="/about">ABOUT</Link>
                <Link to="/service">SERVICE</Link>
                <Link to="/contact">CONTACT</Link>
                {username && username !== "null" &&
                    <div className="dropdown">
                        <button className="dropbtn">{username}
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to="/login" onClick={logout}>Logout</Link>
                            <Link to="/my-bookings">Bookings</Link>
                        </div>
                    </div>
                    || <div><Link to="/login">LOGIN</Link>
                        <Link to="/register">REGISTER</Link></div>}
            </div>

        </div>
    )
}

export default Navbar;