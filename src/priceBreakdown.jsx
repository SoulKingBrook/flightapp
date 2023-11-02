import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from "./http/apiClient";
import "./pricebreakdown.css"

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
        <div className='tablecontainer'>
            {
                price &&
                <table className='tablecontainer'>
                    <tr>
                        <td>Amount Per Adult</td>
                        <td>{price['amountPerAdult']}</td>
                    </tr>
                    <tr>
                        <td>Amount Per Child</td>
                        <td>{price['amountPerChild']}</td>
                    </tr>
                    <tr>
                        <td>Amount Per Infant</td>
                        <td>{price['amountPerInfant']}</td>
                    </tr>
                    <tr>
                        <td>booking Fees</td>
                        <td>{price['bookingFee']}</td>
                    </tr>
                    <tr>
                        <td>Ticket amount</td>
                        <td>{price['amountUsd']}</td>
                    </tr>
                    <tr>
                        <td><em>Total</em></td>
                        <td><h3>{price['totalAmountUsd']}</h3></td>

                    </tr>
                    <tr>
                        <td></td>
                        <button onClick={confirmBooking}>Confirm Booking</button>

                    </tr>

                </table>

            }
        </div>
    )
}

export default PriceBreakdown