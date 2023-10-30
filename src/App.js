import React from 'react';
import './index.css';
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



function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<FlightBooking />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/priceBreakdown" element={<PriceBreakdown />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin/register" element={<AdminRegistration />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/cancelbookings" element={<CancelBookings />} />
            <Route path="*" element={<Dummy />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
