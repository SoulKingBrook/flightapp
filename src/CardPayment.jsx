import React, { useState } from 'react';
import './CardPayment.css';
import apiClient from './http/apiClient';
import { useContext } from 'react';
import { LoginContext } from './Context/LoginContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorIcon from "./icons/ErrorIcon";
import CreditCard from './icons/CreditCard';

const CardPayment = ({ id }) => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { token, sessionUser } = useContext(LoginContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const confirmBooking = () => {
        let legId = searchParams.get("id");
        const postData = {
            "flightId": legId,
            "email": sessionUser
        }
        if (name == "" || cardNumber == "" || expiryDate == "" || cvc == "") {
            setErrorMessage("please Fill all the Details")
            return
        }
        else {
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
        <div className="payment-form-container">
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <div style={{ "display": "flex" }}>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            style={{ "marginRight": "10px" }}
                            required
                        />
                        <CreditCard />
                    </div>
                </div>
                <div className="form-group">
                    <label>Expiry Date and CVC:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {errorMessage !== "" &&
                    <div className="error-message">
                        <ErrorIcon className="icon" />
                        <div>
                            {errorMessage}
                        </div>
                    </div>}
                <button type="submit" className="submit-button" disabled={loading} onClick={confirmBooking} >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default CardPayment;
