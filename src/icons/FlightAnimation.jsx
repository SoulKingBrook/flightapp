import React, { useState, useEffect } from 'react';
import './FlightAnimation.css';
import FlightIcon from './FlightIcon';
import flightImage from '../images/badge.png'

const FlightAnimation = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            // Toggle the animation state
            setAnimate((prevAnimate) => !prevAnimate);
        }, 1000); // Set the interval duration in milliseconds (e.g., 3000ms = 3 seconds)

        // Clear the interval on component unmount to prevent memory leaks
        return () => clearInterval(animationInterval);
    }, []);

    return (
        <div className={`flight ${animate ? 'fly-away' : ''}`}>
            <img src={flightImage} alt="" style={{ "height": "100px", "width": "100px" }} />
        </div>
    );
};

export default FlightAnimation;
