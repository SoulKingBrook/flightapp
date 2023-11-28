import React, { useState } from "react";
import "./FlightBooking.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import AdultIcon from "./icons/adult";
import ChildIcon from "./icons/child";
import InfantIcon from "./icons/infant";
import ErrorIcon from "./icons/ErrorIcon";


const FlightBooking = () => {
  const [from, setFrom] = useState("default");
  const [to, setTo] = useState("default");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [bookingClass, setBookingClass] = useState("default");
  const [trip, setTrip] = useState("default");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const displayFlights = () => {
    if (from === "default" || to === "default" || bookingClass === "default" || trip === "default" || children + infants + adults === 0 || departureDate == '' || (trip === "roundtrip" && arrivalDate == '')) {
      setError("please select all values")
      return
    }
    else if (from === to) {
      setError("Source and destination cannot be same")
      return
    }
    if (trip === "onewaytrip") {
      navigate(`/flights/?from=${from}&to=${to}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&class=${bookingClass}&trip=${trip}`);
    }
    else {
      navigate(`/flights/?from=${from}&to=${to}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&class=${bookingClass}&trip=${trip}&arrivalDate=${arrivalDate}`);
    }
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
            <label htmlFor="source">Source</label>
            <br />
            <select value={from}
              placeholder="Enter Source"
              id="source"
              onChange={(ev) => setFrom(ev.target.value)}
              className="inputBox">
              <option disabled value="default">Enter source</option>
              <option value="JFK">John F. Kennedy International in New York</option>
              <option value="LAX">Los Angeles International</option>
              <option value="ORD">Chicago O'Hare International</option>
              <option value="MIA">Miami International Airport</option>
              <option value="DFW">Dallas/Fort Worth International Airport</option>
              <option value="HEL">Helinski, Denver</option>
              <option value="OUL">Oulu Airport</option>
              <option value="DEN">Denver International Airport</option>

            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="destination">Destination</label>
            <br />
            <select value={to}
              placeholder="Enter Destination"
              id="destination"
              onChange={(ev) => setTo(ev.target.value)}
              className="inputBox">
              <option disabled value="default">Enter destination</option>
              <option value="JFK">John F. Kennedy International in New York</option>
              <option value="LAX">Los Angeles International</option>
              <option value="ORD">Chicago O'Hare International</option>
              <option value="MIA">Miami International Airport</option>
              <option value="DFW">Dallas/Fort Worth International Airport</option>
              <option value="HEL">Helinski, Denver</option>
              <option value="OUL">Oulu Airport</option>
              <option value="DEN">Denver International Airport</option>
            </select>
          </div>
        </div>
        <br />
        <div className="inputContainerRow">
          <div className="inputContainer">
            <label htmlFor="departureDate">Departure Date</label>
            <br />
            <input
              value={departureDate}
              id="departureDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              placeholder="Enter Arrival Date"
              onChange={(ev) => setDepartureDate(ev.target.value)}
              className="inputBox"
            />
          </div>
          <div className="inputContainer">
            <label >Passengers</label>
            <br />
            <div className="numbersContainer">
              <AdultIcon />
              <input
                value={adults}
                type="number"
                min={0}
                onChange={(ev) => setAdults(ev.target.value)}
                className="numberBox"
              />
              <ChildIcon />
              <input
                value={children}
                type="number"
                min={0}
                onChange={(ev) => setChildren(ev.target.value)}
                className="numberBox"
              />
              <InfantIcon />
              <input
                value={infants}
                type="number"
                min={0}
                onChange={(ev) => setInfants(ev.target.value)}
                className="numberBox"
              />
            </div>
          </div>
        </div>
        <div className="inputContainerRow">
          <div className="inputContainer">
            <label htmlFor="bookingClass">Booking Class</label>
            <br />
            <select value={bookingClass}
              placeholder="select Cabin class"
              id="bookingClass"
              onChange={(ev) => setBookingClass(ev.target.value)}
              className="inputBox">
              <option disabled value="default">select Cabin class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
              <option value="Premium_Economy">Premium Economy</option>
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="trip">Trip</label>
            <br />
            <select value={trip}
              placeholder="select Cabin class"
              id="trip"
              onChange={(ev) => setTrip(ev.target.value)}
              className="inputBox">
              <option disabled value="default">select Trip Type</option>
              <option value="onewaytrip">One Way Trip</option>
              <option value="roundtrip">Round Trip</option>
            </select>
          </div>

        </div>
        <div className="inputContainerRow">
          {trip == "roundtrip" &&
            <div className="inputContainer">
              <label htmlFor="arrivalDate">Arrival Date</label>
              <br />
              <input
                value={arrivalDate}
                id="arrivalDate"
                type="date"
                min={departureDate}
                placeholder="Enter Arrival Date"
                onChange={(ev) => setArrivalDate(ev.target.value)}
                className="inputBox"
              />
            </div>
          }
        </div>
        <br />
        {error !== null &&
          <div className="error-message">
            <ErrorIcon className="icon" />
            <div>
              {error}
            </div>
          </div>}
        <br />
        <button onClick={displayFlights}>Proceed</button>
      </div>
    </div>
  );
};

export default FlightBooking;