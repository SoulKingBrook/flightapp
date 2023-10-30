import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from './http/apiClient';
import "./flights.css"
import data from './a';
import Filter from './Filter';


const Flights = () => {

    const [searchParams] = useSearchParams();
    const [isFetched, setFetched] = useState(false);
    const [flights, setFlights] = useState(null);
    const navigate = useNavigate();
    const findTrips = (id) => {
        navigate(`/priceBreakdown/?id=${id}`)
    }
    // useEffect(() => {
    //     let flightsInStorage = localStorage.getItem("flights");
    //     try {
    //         flightsInStorage = JSON.parse(flightsInStorage)
    //     }
    //     catch (e) {
    //         localStorage.setItem("flights", null);
    //     }
    //     if (flightsInStorage && flightsInStorage.legs && flightsInStorage['legs'].length > 0 && flightsInStorage['legs'][0].departureAirportCode === searchParams.get("from") && flightsInStorage['legs'][0].arrivalAirportCode === searchParams.get("to")) {

    //         setFlights(flightsInStorage.legs)
    //         console.log(flightsInStorage.legs)
    //         return

    //     }
    //     else if (!isFetched) {
    //         let token = localStorage.getItem("token");
    //         let date = searchParams.get("date").split('-').reverse().join('-')
    //         let getData = {
    //             "source": searchParams.get("from"),
    //             "destination": searchParams.get("to"),
    //             "departureDate": date,
    //             "noOfAdults": searchParams.get("adults"),
    //             "noOfChildren": searchParams.get("children"),
    //             "noOfInfants": searchParams.get("infants"),
    //             "trip": searchParams.get("trip"),
    //             "bookingClass": searchParams.get("class")
    //         }


    //         apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
    //         apiClient.post("/app/flights", getData).then(result => {
    //             console.log(result)
    //             setFlights(result.data.legs)
    //             localStorage.setItem("flights", JSON.stringify(result.data))
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
        console.log(data)
        setFlights(data.legs)
        localStorage.setItem("flights", JSON.stringify(data))
    }, [])
    return (

        <div className='container'>
            <div className='flightsContainer'>
                {flights != null &&
                    flights.map(
                        (flight) => {
                            return (<div className='flightcard' key={flight.id} onClick={() => findTrips(flight.id)}>
                                <div className='col'>
                                    <p className='heading'>{flight.departureTime}</p>

                                    <p>{flight.departureAirportCode}</p>
                                </div>
                                <div className="col">
                                    <p>{flight.airlines.name}</p>
                                    <div className='line'>
                                    </div>
                                    <p>{flight.duration}</p>
                                </div>
                                <div className='col'>
                                    <p className='heading'>{flight.arrivalTime}</p>
                                    <p>{flight.arrivalAirportCode}</p>
                                </div>
                                <div className='priceContainer'>
                                    <p className='price'>{'$' + flight.prices.price.totalAmountUsd}</p>
                                </div>
                            </div>)
                        }
                    )
                }
                <br />
                <br />
                <br />
                <br />
            </div>
            <div className="filterContainer">
                <Filter flights={flights} setFlights={setFlights} />
            </div>
        </div>
    )
}
export default Flights;