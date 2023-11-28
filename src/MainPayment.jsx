import React, { useState } from 'react';
import CardPayment from './CardPayment';
import PayPalForm from './PayPalForm';
import "./MainPayment.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

const MainPayment = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('creditCard');
    const id = searchParams.get("id");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="payment-form-container-main">
            <h1>Choose Payment Method</h1>
            <div className="tabs">
                <button
                    onClick={() => handleTabChange('creditCard')}
                    className={activeTab === 'creditCard' ? 'active' : ''}
                >
                    Credit Card
                </button>
                <button
                    onClick={() => handleTabChange('paypal')}
                    className={activeTab === 'paypal' ? 'active' : ''}
                >
                    PayPal
                </button>
            </div>
            {activeTab === 'creditCard' ? (
                <CardPayment id={id} />
            ) : (
                <PayPalForm />
            )}
        </div>
    );
};

export default MainPayment;
