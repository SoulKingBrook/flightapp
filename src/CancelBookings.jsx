import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from './http/apiClient'
import { useNavigate } from 'react-router-dom'

const CancelBookings = () => {

    const [bookings, setBookings] = useState(null);
    const [isFetched, setFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isFetched) {
            let token = localStorage.getItem("token");
            apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
            apiClient.get("/app/booking/all-bookings").then((result) => {
                setBookings(result.data)
                console.log(bookings)
                setFetched(true)
            }).catch((err) => {
                console.log(err)
                if (err && err.response && err.response.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("sessionUser")
                    const event = new CustomEvent('localdatachanged');
                    document.dispatchEvent(event);
                    navigate("/admin/login")
                }
            })
        }
    }, [bookings])

    return (
        <div>{bookings &&
            bookings.map(
                (booking) => {
                    return (<div key={booking.bookingID}>
                        <h3>{booking["bookingID"]}</h3>
                    </div>)
                })
        }</div>
    )
}

export default CancelBookings