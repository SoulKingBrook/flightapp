import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from "./http/apiClient";

const PriceBreakdown = () => {

    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        let legId = searchParams.get("id");
        let leg = JSON.parse(localStorage.getItem("flights"))["legs"].find(l => l["id"] === legId)
        console.log(leg)
        setPrice(leg.prices.price)
    }, [])
    const confirmBooking = () => {
        let legId = searchParams.get("id");
        const postData = {
            "flightId": legId,
            "email": localStorage.getItem("sessionUser")
        }
        let token = localStorage.getItem("token");
        apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        apiClient.post("/app/booking", postData).then(() => {
            navigate("/success");
        }).catch((err) => {
            if (err && err.response && err.response.status === 403) {
                navigate("/login")
            }
            else {
                navigate("/error")
            }
        })

    }
    return (
        <div>
            {
                price &&
                <div>
                    <h3>{price['amountPerAdult']}</h3>
                    <h3>{price['amountPerChild']}</h3>
                    <h3>{price['amountPerInfant']}</h3>
                    <h3>{price['bookingFee']}</h3>
                    <h3>total: {price['totalAmountUsd']}</h3>
                    <button onClick={confirmBooking}>Confirm Booking</button>
                </div>

            }
        </div>
    )
}

export default PriceBreakdown