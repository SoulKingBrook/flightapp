// PayPalForm.js
import React, { useContext } from 'react';
import "./PayPalForm.css"
import PayPal from './icons/PayPal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from './http/apiClient';
import { LoginContext } from './Context/LoginContext';
import ErrorIcon from "./icons/ErrorIcon";

import { useState } from 'react';

const PayPalForm = () => {
    // PayPal specific form logic goes here
    const { token, sessionUser } = useContext(LoginContext);
    const [searchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const confirmBooking = () => {

        if (email == "" || password == "") {
            setErrorMessage("please Fill all details");
        }
        else {
            let legId = searchParams.get("id");
            const postData = {
                "flightId": legId,
                "email": sessionUser
            }
            apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
            apiClient.post("/app/booking", postData).then((response) => {
                console.log(response)
                navigate(`/success/?id=${response.data}`);
            }).catch((err) => {
                if (err && err.response && err.response.status === 403) {
                    navigate("/login")
                }
                else {
                    navigate("/error")
                }
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {/* PayPal form elements go here */}
            <PayPal />
            <div>
                <label htmlFor="paypal-email">PayPal Email:</label>
                <input type="email" id="paypal-email" required value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="paypal-password">Password:</label>
                <input type="password" id="paypal-password" required value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage !== "" &&
                <div className="error-message">
                    <ErrorIcon className="icon" />
                    <div>
                        {errorMessage}
                    </div>
                </div>}

            <button className='paypal-button' type="submit" onClick={confirmBooking} >Pay with PayPal</button>
        </form>
    );
};

export default PayPalForm;
