import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from "./http/apiClient";
import "./pricebreakdown.css"
import { useContext } from 'react';
import { FlightContext } from './Context/FlightContext';
import { LoginContext } from './Context/LoginContext';
import Counter from './Counter';

const PriceBreakdown = () => {

    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState(null);
    const { flights } = useContext(FlightContext);
    const [baggage, setBaggage] = useState(0)
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    const id = searchParams.get("id");
    const navigate = useNavigate();
    useEffect(() => {
        let legId = id
        let leg = flights["legs"].find(l => l["id"] === legId)
        console.log(leg)
        setPrice(leg.prices.price)
    }, [])
    const confirmBooking = () => {
        navigate(`/personalInfo/?id=${id}&adults=${adults}&children=${children}&infants=${infants}`)
    }
    return (
        <div className='tablecontainer'>
            <h3>Price BreakDown</h3>
            {
                price &&
                <table className='table'>
                    {price['amountPerAdult'] + price['amountPerChild'] + price['amountPerInfant'] != 0 && <React.Fragment>
                        <tr>
                            <td>Amount Per Adult</td>
                            <td>$ {(+price['amountPerAdult']).toFixed(2)} * {adults}</td>
                        </tr>
                        <tr>
                            <td>Amount Per Child</td>
                            <td>${(+price['amountPerChild']).toFixed(2)} * {children}</td>
                        </tr>
                        <tr>
                            <td>Amount Per Infant</td>
                            <td>${(+price['amountPerInfant']).toFixed(2)} * {infants}</td>
                        </tr>


                    </React.Fragment> ||
                        <tr>
                            <td>Ticket amount</td>
                            <td>${(+price['amountUsd']).toFixed(2)} *{(+adults) + (+children)}</td>
                        </tr>}
                    <tr>
                        <td>booking Fees</td>
                        <td>${(+price['bookingFeeUsd']).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Tax Amount</td>
                        <td>${(+price['taxAmountUsd']).toFixed(2)}</td>
                    </tr>
                    <tr >
                        <td className='baggage'>Baggage  <div style={{ "width": "30%", "paddingLeft": "5px" }}><Counter baggage={baggage} setBaggage={setBaggage} /></div></td>
                        <td>${(+baggage * 60).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><em>Total</em></td>
                        <td><h3>${(+price['totalAmountUsd'] + price['taxAmountUsd'] + baggage * 60).toFixed(2)}</h3></td>

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