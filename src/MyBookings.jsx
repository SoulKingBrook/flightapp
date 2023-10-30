import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from './http/apiClient'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {

    const [bookings, setBookings] = useState(null)
    const [user, setUser] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        setUser(localStorage.getItem("sessionUser"))
        console.log(localStorage.getItem("sessionUser"))
        const getData = {
            "email": user
        }
        console.log(getData)
        apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        apiClient.post("/app/booking/my-bookings", getData).then((result) => {
            setBookings(result.data)
            console.log(result)
        }).catch((err) => {
            if (err && err.response && err.response.status === 403) {
                localStorage.setItem("sessionUser", null)
                const event = new CustomEvent('localdatachanged');
                document.dispatchEvent(event);
                navigate("/login")
            }
        })
    }, [user])
    return (
        <div>{ }</div>
    )
}

export default MyBookings