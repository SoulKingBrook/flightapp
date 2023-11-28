import React from 'react';
import './SessionExpiredPage.css';
import { useNavigate } from 'react-router-dom';

const SessionExpiredPage = () => {
    const navigate = useNavigate();
    return (
        <div className="session-expired-container">
            <div className="session-expired-content">
                <h1>Session Expired</h1>
                <p>Your session has expired. Please log in again.</p>
                {/* Add your login button or redirect logic here */}
                <button onClick={() => navigate("/")}>Log In</button>
            </div>
        </div>
    );
};

export default SessionExpiredPage;
