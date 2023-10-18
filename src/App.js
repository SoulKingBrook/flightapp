import React from 'react';
import './index.css';
import Login from './login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import FlightBooking from './flightBooking';
import Registration from './Registration';
import Dummy from './Dummy';
import Flights from './flights';
import Forgot from './forgot';



function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
    <div className="navbar">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/service">SERVICE</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link>
      </div>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<FlightBooking />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="*" element={<Dummy />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
