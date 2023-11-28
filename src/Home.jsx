import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from './Context/LoginContext'
function Home() {
    const { sessionUser } = useContext(LoginContext)
    const toUrl = sessionUser === null ? "/login" : "/booking"
    return (
        <div className="card-container" >
            <div className="card">
                <div className="HomeTitleContainer">
                    <h2>For Users</h2>
                    <p>book flights from different websites at the best price</p>

                </div>
                <Link to={toUrl} className='absolute-button'><button>Book flights</button></Link>
            </div>
            <div className="card">
                <div className="HomeTitleContainer">
                    <h2>For Admins</h2>
                    <p>login here as an employee for resolving customer concerns</p>

                </div>
                <Link to="/admin/login" className='absolute-button'><button>Login as Admin</button></Link>
            </div>
        </div>
    )
}

export default Home