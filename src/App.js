import React, { useEffect } from 'react';
import './index.css';
import './App.css'
import Login from './login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightBooking from './flightBooking';
import Registration from './Registration';
import Dummy from './Dummy';
import Flights from './flights';
import Forgot from './forgot';
import Home from './Home';
import Navbar from './navbar';
import PriceBreakdown from './priceBreakdown';
import MyBookings from './MyBookings';
import AdminRegistration from './AdminRegister';
import AdminLogin from './AdminLogin';
import CancelBookings from './CancelBookings';
import { LoginContext } from './Context/LoginContext'
import { useState } from 'react';
import { FlightContext } from './Context/FlightContext';
import MainPayment from './MainPayment';
import PersonalInfoPage from './PersonalInfoPage';
import Success from './icons/Success';
import AboutUs from './AboutUs';
import Service from './service';
import SessionExpiredPage from './SessionExpiredPage';
import Ticket from './Ticket';


function App() {
  const [sessionUser, setSessionUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [token, setToken] = useState(null);
  const [flights, setFlights] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passengers, setPassengers] = useState(null);
  const divStyle = {
    backgroundSize: 'cover',
    position: 'relative',
    height: '100%',
  }
  const userRoutes = [
    <Route path="/booking" element={<FlightBooking />} />,
    <Route path="/flights" element={<FlightContext.Provider value={{ flights, setFlights }}><Flights /></FlightContext.Provider>} />,
    <Route path="/personalInfo" element={<PersonalInfoPage />} />,
    <Route path="/payment" element={<MainPayment />} />,
    <Route path="/success" element={<Success />} />,
    <Route path="/priceBreakdown" element={<FlightContext.Provider value={{ flights, setFlights }}><PriceBreakdown /></FlightContext.Provider>} />,
    <Route path="/my-bookings" element={<FlightContext.Provider value={{ flights, setFlights }}><MyBookings /></FlightContext.Provider>} />,


    <Route path="/admin/cancelbookings" element={<FlightContext.Provider value={{ flights, setFlights }}><CancelBookings /></FlightContext.Provider>} />
  ]

  return (
    <div className="App" style={{ ...divStyle, 'backgroundImage': `url(${'https://c4.wallpaperflare.com/wallpaper/319/249/274/the-sky-flight-a380-the-plane-wallpaper-preview.jpg'})` }}>

      <LoginContext.Provider value={{ sessionUser, setSessionUser, token, setToken, timeLeft, setTimeLeft, passengers, setPassengers }}>
        <BrowserRouter>
          <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          <div className="main"  >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/admin/register" element={<AdminRegistration />} />
              <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
              <Route path="/about" element={<AboutUs />} />,
              <Route path="/service" element={<Service />} />,
              <Route path="/ticket" element={<Ticket />} />,
              <Route path="/logout" element={<SessionExpiredPage />} />,
              {sessionUser &&
                userRoutes
              }
              <Route path="*" element={<Dummy />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
