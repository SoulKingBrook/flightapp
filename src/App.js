import React from 'react';
import './index.css';
import Login from './login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightBooking from './flightBooking';
import Registration from './Registration';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<FlightBooking />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
