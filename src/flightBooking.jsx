import React, { useState } from "react";
import "./FlightBooking.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
const FlightBooking = () => {
  const [from, setFrom] = useState("default");
  const [to, setTo] = useState("default");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const displayFlights = () => {
    navigate(`/flights/?from=${from}&to=${to}&fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <div>
      
      <div className="mainContainer">
        <div className="titleContainer">
          <h2>Booking</h2>
        </div>
        <br />
        <div className="inputContainerRow">
          <div className="inputContainer">
            
            <select value={from}
              placeholder="Enter Source"
              id="source"
              onChange={(ev) => setFrom(ev.target.value)}
              className="inputBox">
              <option disabled value="default">Enter source</option>
              <option value="dcity1">dcity1</option>
              <option value="dcity2">dcity2</option>
              </select>
          </div>
          <div className="inputContainer">
          <select value={to}
              placeholder="Enter Destination"
              id="destination"
              onChange={(ev) => setTo(ev.target.value)}
              className="inputBox">
              <option disabled value="default">Enter destination</option>
              <option value="acity1">acity1</option>
                <option value="acity2">acity2</option>
              </select>
          </div>
        </div>
        <br />
        <div className="inputContainerRow">
          <div className="inputContainer">
            <input
              value={fromDate}
              type="date"
              placeholder="Enter Start Date"
              onChange={(ev) => setFromDate(ev.target.value)}
              className="inputBox"
            />
          </div>
          <div className="inputContainer">
            <input
              value={toDate}
              type="date"
              placeholder="Enter Arrival Date"
              onChange={(ev) => setToDate(ev.target.value)}
              className="inputBox"
            />
          </div>
        </div>
        <br />
        <button onClick={displayFlights}>Proceed</button>
      </div>
    </div>
  );
};

export default FlightBooking;