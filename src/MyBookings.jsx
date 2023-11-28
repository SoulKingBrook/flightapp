import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from './http/apiClient'
import { useNavigate } from 'react-router-dom'
import "./booking.css"
import { useContext } from 'react'
import { LoginContext } from './Context/LoginContext'

const MyBookings = () => {

    const [bookings, setBookings] = useState(null)
    const { token, sessionUser, setSessionUser } = useContext(LoginContext);
    const [user] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const getData = {
            "email": sessionUser
        }
        console.log(getData)
        apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        apiClient.post("/app/booking/my-bookings", getData).then((result) => {
            setBookings(result.data)
            console.log(result)
        }).catch((err) => {
            if (err && err.response && err.response.status === 403) {
                setSessionUser(null)
                navigate("/")
            }
        })
    }, [user])
    return (
        <div className="booking-list-container">
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>
                            Booking ID
                        </th>
                        <th>
                            Flight ID
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings &&
                        bookings.map(booking => {
                            return (<tr key={booking.bookingID}>
                                <td>{booking.bookingID}</td>
                                <td>{booking.flightId}</td>
                            </tr>)
                        })
                    }
                </tbody></table>
        </div>
    )
}

export default MyBookings