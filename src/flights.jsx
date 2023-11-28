import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from './http/apiClient';
import "./flights.css"
import flightData from './a';
import Filter from './Filter';
import { useContext } from 'react';
import { FlightContext } from './Context/FlightContext';
import { LoginContext } from './Context/LoginContext';
import FlightIcon from './icons/FlightIcon';
import Tooltip from './tooltip';
import InfoIcon from './icons/InfoIcon';
import FlightAnimation from './icons/FlightAnimation';
import sad from "./images/sad.png"


const Flights = () => {
    const { token } = useContext(LoginContext);
    const [searchParams] = useSearchParams();
    const [isFetched, setFetched] = useState(false);
    const navigate = useNavigate();
    const { flights, setFlights } = useContext(FlightContext);
    const findTrips = async (id) => {
        await resetFilters();
        let adults = searchParams.get("adults");
        let children = searchParams.get("children");
        let infants = searchParams.get("infants");
        navigate(`/priceBreakdown/?id=${id}&adults=${adults}&children=${children}&infants=${infants}`)
    }


    const [priceRange, setPriceRange] = useState([0, 0])
    const [departureTimeRange, setDepartureTimeRange] = useState([-1, -1])
    const [departureTimeValues, setDepartureTimeValues] = useState([-1, -1])
    const [priceValue, setPriceValue] = useState(0);
    const [initialFlights, setInitialFlights] = useState(null)
    const [filterisFetched, setFilterFetched] = useState(false)
    const [sortBy, setSortBy] = useState("");

    const convertTimeString = (time) => {
        const [hour, minute] = time.split(":");

        const formattedHour = parseInt(hour);
        const formattedMinute = parseInt(minute);

        // Create a new Date object using the hour, minute, and period
        const dateTime = new Date(
            2023,
            0,
            1,
            formattedHour,
            formattedMinute,
            0,
        );
        return dateTime
    }
    const resetFilters = () => {
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.map(flight => flight.prices.price.totalAmountUsd);
            if (x.length == 0) { return }
            console.log(x.reduce((a, b) => Math.min(a, b)))
            setPriceRange([x.reduce((a, b) => Math.min(a, b)), x.reduce((a, b) => Math.max(a, b))])
            setPriceValue(x.reduce((a, b) => Math.max(a, b)));

            let y = initialFlights.map(flight => convertTimeString(flight.departureTime))
            setDepartureTimeRange([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setDepartureTimeValues([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setSortBy("")
        }
    }

    useEffect(() => {
        if (initialFlights == null && flights != null || flights && initialFlights && flights.length > initialFlights.length) {
            setInitialFlights(flights.legs)
            setFilterFetched(true)
        }
    }, [flights])
    useEffect(() => {
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.map(flight => flight.prices.price.totalAmountUsd);
            if (x.length == 0) { return }
            console.log(x.reduce((a, b) => Math.min(a, b)))
            setPriceRange([x.reduce((a, b) => Math.min(a, b)), x.reduce((a, b) => Math.max(a, b))])
            setPriceValue(x.reduce((a, b) => Math.max(a, b)));

            let y = initialFlights.map(flight => convertTimeString(flight.departureTime))
            setDepartureTimeRange([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setDepartureTimeValues([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
        }
    }, [initialFlights])
    useEffect(() => {
        console.log(initialFlights)
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.filter(flight => flight.prices.price.totalAmountUsd <= priceValue)
            let y = { ...flights }
            y.legs = x
            setFlights(y)
        }
    }, [priceValue])
    useEffect(() => {
        console.log(initialFlights)
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.filter(flight => convertTimeString(flight.departureTime) <= departureTimeValues[1] && convertTimeString(flight.departureTime) >= departureTimeValues[0])
            let y = { ...flights }
            y.legs = x
            setFlights(y)
        }
    }, [departureTimeValues])
    useEffect(() => {
        if (flights != null) {
            if (sortBy === "price") {
                let x = [...flights.legs].sort((a, b) => a.prices.price.totalAmountUsd - b.prices.price.totalAmountUsd)
                let y = { ...flights }
                y.legs = x
                console.log(y != flights)
                if (y != flights) {
                    setFlights(y)
                }
            }
            else if (sortBy === "departureTime") {
                let x = [...flights.legs].sort((a, b) => convertTimeString(a.departureTime) - convertTimeString(b.departureTime))
                let y = { ...flights }
                y.legs = x
                if (y != flights) {
                    setFlights(y)
                }
            }
        }
    }, [sortBy])


    // useEffect(() => {

    //     if (!isFetched) {


    //         let tripData = searchParams.get("trip")
    //         let getData = null
    //         let departureDate = searchParams.get("departureDate").split('-').reverse().join('-');
    //         if (tripData === "onewaytrip") {

    //             getData = {
    //                 "source": searchParams.get("from"),
    //                 "destination": searchParams.get("to"),
    //                 "departureDate": departureDate,
    //                 "noOfAdults": searchParams.get("adults"),
    //                 "noOfChildren": searchParams.get("children"),
    //                 "noOfInfants": searchParams.get("infants"),
    //                 "trip": tripData,
    //                 "bookingClass": searchParams.get("class")
    //             }
    //         }
    //         else {
    //             let arrivalDate = searchParams.get("arrivalDate").split('-').reverse().join('-')
    //             getData = {
    //                 "source": searchParams.get("from"),
    //                 "destination": searchParams.get("to"),
    //                 "departureDate": departureDate,
    //                 "arrivalDate": arrivalDate,
    //                 "noOfAdults": searchParams.get("adults"),
    //                 "noOfChildren": searchParams.get("children"),
    //                 "noOfInfants": searchParams.get("infants"),
    //                 "trip": tripData,
    //                 "bookingClass": searchParams.get("class")
    //             }
    //         }

    //         apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
    //         apiClient.post("/app/flights", getData).then(result => {
    //             console.log(result)
    //             setFlights(result.data)
    //             setFetched(true)
    //         }).catch((err) => {
    //             console.log(err)
    //             if (err && err.response && err.response.status === 403) {
    //                 navigate("/login")
    //             }
    //         })
    //     }
    // }, [])

    useEffect(() => {
        console.log(flightData)
        //flightData.legs = []
        setFlights(flightData)
        setFetched(true)
    }, [])
    return (

        <div className='container'>
            {
                isFetched &&
                <div className='flightsContainer'>

                    {flights && flights['legs'] &&
                        flights['legs'].length > 0 &&
                        flights['legs'].map(
                            (flight) => {
                                return (<div className='flightcard' key={flight.id} onClick={() => findTrips(flight.id)}>
                                    <div className='col'>
                                        <p className='heading'>{flight.departureTime}</p>

                                        <p>{flight.departureAirportCode}</p>
                                    </div>
                                    <div className="col">
                                        <p>{flight.airlines.name}</p>
                                        <div className='flight-icon'>
                                            <FlightIcon />
                                        </div>
                                        <div className="row-small">
                                            <p>{flight.duration}</p>
                                            <div className="stops">
                                                {flight.stopoverAirportCodes.length == 0 ? "Direct" : flight.stopoverAirportCodes.length} {flight.stopoverAirportCodes.length == 0 ? "" : flight.stopoverAirportCodes.length == 1 ? " Stop" : " Stops"}
                                                <Tooltip stopCodes={flight.stopoverAirportCodes} />
                                            </div>


                                        </div>
                                    </div>
                                    <div className='col'>
                                        <p className='heading'>{flight.arrivalTime}</p>
                                        <p>{flight.arrivalAirportCode}</p>
                                    </div>
                                    <div className='priceContainer'>
                                        <p className='price'>{'$' + (+flight.prices.price.totalAmountUsd).toFixed(2)}</p>
                                    </div>
                                </div>)
                            }
                        ) ||
                        <div style={{ "height": "100%", "width": "100%", "display": "flex", "alignItems": "center", "paddingLeft": "5%", "backgroundColor": "rgba(255,255,255,0.5)" }}>
                            <img src={sad} alt="" style={{ "width": "200px", "height": "200px" }} />
                            <h2 style={{ "color": "black" }}>Sorry no flights are available</h2>
                        </div>
                    }
                    <br />
                </div>
                ||
                <div className="flightsContainer">
                    <FlightAnimation />
                </div>
            }
            <div className="filterContainer">
                <Filter
                    priceRange={priceRange}
                    departureTimeRange={departureTimeRange}
                    departureTimeValues={departureTimeValues}
                    sortBy={sortBy}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                    setDepartureTimeValues={setDepartureTimeValues}
                    setSortBy={setSortBy}
                />
            </div>
        </div>
    )
}
export default Flights;