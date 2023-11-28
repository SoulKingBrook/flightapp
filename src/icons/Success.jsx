import React from 'react'
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';

const Success = () => {
    const [searchParams] = useSearchParams();
    const { sessionUser } = useContext(LoginContext);
    const bookingID = searchParams.get('id')
    return (
        <div style={{ "height": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "backgroundColor": "rgba(255,255,255,0.5)" }}>
            <svg fill="none" height="35%" viewBox="0 0 16 16" width="35%" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" fill="#059e6f" r="8" transform="matrix(-1 0 0 -1 16 16)" /><path clip-rule="evenodd" d="m11.4983 4.93945c.3096.27519.3374.74924.0623 1.05883l-4.00004 4.50002c-.13723.1544-.33206.2453-.53853.2514s-.4063-.0733-.55236-.2194l-2-1.99996c-.29289-.2929-.29289-.76777 0-1.06066.29289-.2929.76777-.2929 1.06066 0l1.43756 1.43756 3.47151-3.9055c.2752-.30959.7493-.33748 1.0589-.06229z" fill="#fff" fill-rule="evenodd" /></svg>

            <h2 style={{ "color": "black" }}>Booking Successful for user <em style={{ "color": "blue" }}>{sessionUser}</em> Booking ID <em style={{ "color": "blue" }}>{bookingID}</em></h2>
        </div>
    )
}

export default Success