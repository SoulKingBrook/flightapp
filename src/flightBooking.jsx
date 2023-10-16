import React, { useState } from "react";
import "./registration.css"
const FlightBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const fetchFlights = ()=>{}

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Booking</div>
      </div>
      <br />
      <div className={"inputContainerRow"}>
        <div className={"inputContainer"}>
          <label htmlFor="source"></label>
          <input
            value={from}
            placeholder="Enter Source"
            id="source"
            onChange={(ev) => setFrom(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <div className={"inputContainer"}>
          <input
            value={to}
            placeholder="Enter Destination"
            onChange={(ev) => setTo(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <br />
      </div>
      <br />
      <div className={"inputContainerRow"}>
        <div className={"inputContainer"}>
          <input
            value={fromDate}
            type="date"
            placeholder="Enter Start Date"
            onChange={(ev) => setFromDate(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <div className={"inputContainer"}>
          <input
            value={toDate}
            type="date"
            placeholder="Enter arrival date"
            onChange={(ev) => setToDate(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        </div>
        <br />
        <button
        onClick={fetchFlights}
        >Proceed</button>
      
    </div>
  );
};

export default FlightBooking;
