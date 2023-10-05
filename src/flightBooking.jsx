import React, { useState } from "react";
const FlightBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Booking</div>
      </div>

      <br />
      <div className={"inputContainerRow"}>
        <div className={"inputContainerRow"}>
          <input
            value={from}
            placeholder="Enter Source"
            onChange={(ev) => setFrom(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <div className={"inputContainerRow"}>
          <input
            value={to}
            placeholder="Enter Destination"
            onChange={(ev) => setTo(ev.target.value)}
            className={"inputBox"}
          />
        </div>
        <br />
      </div>
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
        <button>Proceed</button>
      
    </div>
  );
};

export default FlightBooking;
