import React, { useEffect } from 'react'
import badge from "./images/badge.png"
import { Link, useNavigate } from 'react-router-dom';
import "./index.css"
import "./navbar.css"
import { useContext } from 'react';
import { LoginContext } from './Context/LoginContext';
import AdultIcon from './icons/adult';
import LoginIcon from './icons/loginIcon';

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const { sessionUser, setSessionUser, timeLeft, setTimeLeft } = useContext(LoginContext)
    const navigate = useNavigate();
    const logout = () => {
        setSessionUser(null);
        setIsAdmin(false);
    }
    useEffect(() => {
        if (sessionUser != null) {
            if (timeLeft <= 0) {
                setSessionUser(null)
                setTimeLeft(-1)
                navigate('/logout')

            }
            setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        }
    }, [timeLeft])

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/">
                    <img src={badge} alt='' />
                </Link>
            </div>
            <div className="right" style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <Link to="/about">ABOUT</Link>
                <Link to="/service">SERVICE</Link>
                {sessionUser &&
                    <div>
                        <div className="dropdown">
                            <button className="dropbtn" style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}><LoginIcon /> {sessionUser}

                                <i className="fa fa-caret-down">

                                </i>
                            </button>
                            <div className="dropdown-content">
                                <Link to="/" onClick={logout}>Logout</Link>
                                <Link to="/my-bookings">Bookings</Link>
                                {isAdmin &&
                                    <Link to="/admin/cancelbookings">Cancel Bookings</Link>
                                }
                            </div>
                        </div>
                        <Link id="badge" title="click to login again" to="/login" onClick={logout}>{Math.floor(timeLeft / 60)}:{("0" + timeLeft % 60).slice(-2)}</Link>
                    </div>
                    || <div><Link to="/login">LOGIN </Link>
                        <Link to="/register">REGISTER</Link></div>}
            </div>

        </div>
    )
}

export default Navbar;