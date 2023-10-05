import logo from './logo.svg';
import './App.css';
import Login from './login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightBooking from './flightBooking';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<FlightBooking />} />
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
