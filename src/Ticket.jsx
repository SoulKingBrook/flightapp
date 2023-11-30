import QRCode from 'qrcode.react'
import React, { useContext } from 'react'
import "./Ticket.css"
import { LoginContext } from './Context/LoginContext';
import { useSearchParams } from 'react-router-dom';

const Ticket = () => {
    const { passengers } = useContext(LoginContext);
    const [searchParams] = useSearchParams();
    console.log(passengers)

    return (
        <div className='ticket-container'>
            <div className="ticket-details">
                <h2>ELECTRONIC TICKET</h2>
                <h3>Flight Booking System</h3>
                <h4>At the airport, you must present proof of identity</h4>
                <h3>PASSENGERS</h3>
                {passengers &&

                    Object.keys(passengers).map(key => {
                        return <h5>{passengers[key]["fullName"] + " "} {"/ " + passengers[key]["mobile"]} {"/ " + passengers[key]["age"]}</h5>
                    })

                }
            </div>
            <div className="ticket-qr">
                <QRCode value={searchParams.get('bookingID')} />
                <h4>SAVE TIME</h4>
                <p>scan this qr code at one of our interactive kiosk to receive your boarding pass</p>
            </div>
        </div>
    )
}

export default Ticket