import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from './http/apiClient'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './Context/LoginContext'
import { useContext } from 'react'
import DeleteIcon from './icons/DeleteIcon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Warning from './icons/Warning'


const CancelBookings = () => {
    const { token, setToken, setSessionUser } = useContext(LoginContext);
    const [bookings, setBookings] = useState(null);
    const [isFetched, setFetched] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [deletableID, setDeletableID] = useState(null)
    const notify = (message) => toast(message);
    const popup = (
        <div className="cancel-popup">
            <Warning />
            <p className='warning-message'>Are you Sure you want to delete this Booking?</p>
            <button className='yes-button' onClick={() => deleteBooking(deletableID)}>Yes</button>
            <button className='cancel-button' onClick={() => {
                setDeletableID(null);
                setShowPopup(false);
            }}>Cancel</button>
        </div>
    )

    const navigate = useNavigate();

    useEffect(() => {
        if (!isFetched) {
            apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
            apiClient.get("/app/booking/all-bookings").then((result) => {
                setBookings(result.data)
                console.log(bookings)
                setFetched(true)
            }).catch((err) => {
                console.log(err)
                if (err && err.response && err.response.status === 403) {
                    setToken(null)
                    setSessionUser(null)
                    const event = new CustomEvent('localdatachanged');
                    document.dispatchEvent(event);
                    navigate("/admin/login")
                }
            })
        }
    }, [bookings])

    const deleteBooking = (bookingID) => {

        setShowPopup(false);
        apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
        apiClient.post(`/app/booking/my-bookings/${bookingID}`).then(resp => {
            setBookings(bookings.filter(booking => booking.bookingID != bookingID))
        }).catch(
            err => {
                toast.error('Error deleting Booking, please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        );
    }
    const popupHandover = (bookingID) => {
        setShowPopup(true);
        setDeletableID(bookingID);
    }
    return (
        <div className="booking-list-container">
            <ToastContainer />
            {showPopup &&
                popup
            }
            {bookings &&
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Email</th>
                            <th>Flight ID</th>
                            <th>Cancel Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings && bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.bookingID}</td>
                                <td>{booking.email}</td>
                                <td>{booking.flightId}</td>
                                <td><button onClick={() => popupHandover(booking.bookingID)}><DeleteIcon /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table> || <h1>You dont have any Upcoming Bookings book Flights now</h1>}
            <br />
            <br />

        </div>

    )
}

export default CancelBookings