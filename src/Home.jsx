import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
function Home() {
    const toUrl = localStorage.getItem("sessionUser") === null || localStorage.getItem("sessionUser") === "null" ? "/login" : "/booking"
    return (
        <div className="card-container">
            <div className="card">
                <div className="titleContainer">
                    <h2>For Users</h2>
                    <p>book flights from different websites at the best price</p>
                    <Link to={toUrl}><button>Book flights</button></Link>
                </div>
            </div>
            <div className="card">
                <div className="titleContainer">
                    <h2>For Admins</h2>
                    <p>login here as an employee for resolving customer concerns</p>
                    <Link to="/admin/login"><button>Login as Admin</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home