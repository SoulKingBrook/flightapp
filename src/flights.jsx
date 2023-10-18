import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import apiClient from './http/apiClient';

const Flights =()=>{

    const [searchParams] = useSearchParams();
    const [isFetched, setFetched] = useState(false);
    const [flights,setFlights]=useState(null)

  useEffect(() => {
    if(!isFetched){
        let token=localStorage.getItem("token");
        let fromDate = searchParams.get("fromDate").split('-').reverse().join('-')
        let toDate = searchParams.get("toDate").split('-').reverse().join('-')
        let getData={
            "source":searchParams.get("from"),
            "destination":searchParams.get("to"),
            "rangeStart":fromDate,
            "rangeEnd":toDate
        }
        apiClient.defaults.headers.common={"Authorization":`Bearer ${token}`}
        apiClient.post("/app/booking/flights",getData).then(result =>{
            console.log(result)
            setFlights(result.data)
            setFetched(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
}
  )
    console.log(searchParams.get("from"))

    return (
        
        <div>
            {flights&&
            flights.map(
                (flight) =>{
                    return (<div key={flight.flightNumber}>
                        <h3>{flight.flightNumber}</h3>
                        <h3>{flight.dateOfDeparture}</h3>
                        <h3>{flight.dateOfDeparture}</h3>
                        <h3>{flight.departureCity}</h3>
                        <h3>{flight.estimatedDepartureTime}</h3>
                    </div>)
                }
            )
            }
        </div>
    )
}
export default Flights;