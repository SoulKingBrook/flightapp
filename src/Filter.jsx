import React, { useEffect, useState } from 'react'
import "./flights.css"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material'

const Filter = ({ flights, setFlights }) => {
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [departureTimeRange, setDepartureTimeRange] = useState([-1, -1])
    const [departureTimeValues, setDepartureTimeValues] = useState([-1, -1])
    const [priceValue, setPriceValue] = useState(0);
    const [initialFlights, setInitialFlights] = useState(null)
    const [isFetched, setFetched] = useState(false)
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

    useEffect(() => {
        if (!isFetched && flights != null) {
            setInitialFlights(flights)
            setFetched(true)
        }
    })
    useEffect(() => {
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.map(flight => flight.prices.price.totalAmountUsd);
            if (x.length == 0) { return }
            console.log(x.reduce((a, b) => Math.min(a, b)))
            setPriceRange([x.reduce((a, b) => Math.min(a, b)), x.reduce((a, b) => Math.max(a, b))])
            setPriceValue(priceRange[1]);

            let y = initialFlights.map(flight => convertTimeString(flight.departureTime))
            setDepartureTimeRange([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setDepartureTimeValues([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
        }
    }, [initialFlights])
    useEffect(() => {
        console.log(initialFlights)
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.filter(flight => flight.prices.price.totalAmountUsd <= priceValue)
            setFlights(x)
        }
    }, [priceValue])
    useEffect(() => {
        console.log(initialFlights)
        if (initialFlights != null && initialFlights != []) {
            let x = initialFlights.filter(flight => convertTimeString(flight.departureTime) <= departureTimeValues[1] && convertTimeString(flight.departureTime) >= departureTimeValues[0])
            setFlights(x)
        }
    }, [departureTimeValues])
    useEffect(() => {
        console.log(initialFlights)
        if (flights != null) {
            if (sortBy === "price") {
                setFlights([...flights].sort((a, b) => a.prices.price.totalAmountUsd - b.prices.price.totalAmountUsd))
                console.log(flights)
            }
            else if (sortBy === "departureTime") {
                setFlights([...flights].sort((a, b) => convertTimeString(a.departureTime) - convertTimeString(b.departureTime)))
                console.log(flights)
            }
        }
    }, [sortBy])

    return (
        <div className='filter'>
            <h3>Price Range</h3>
            <p>{priceRange[0] + ' $ -  ' + priceRange[1] + ' $'}</p>
            <Slider value={priceValue} min={priceRange[0]} max={priceRange[1]} onChange={(e, v) => { setPriceValue(v) }} valueLabelDisplay="on" />

            <h3>Departure Time Range</h3>
            <p>{new Date(departureTimeValues[0]).toLocaleTimeString('en-GB') + ' - ' + new Date(departureTimeValues[1]).toLocaleTimeString('en-GB')}</p>
            <Slider value={departureTimeValues} min={departureTimeRange[0]} max={departureTimeRange[1]} onChange={(e, v) => { setDepartureTimeValues(v) }} valueLabelDisplay="off" />

            <br />
            <br />
            <br />
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Sort By</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={sortBy}
                    onChange={(e, v) => setSortBy(v)}
                >
                    <FormControlLabel value="departureTime" control={<Radio />} label="Departure Time" />
                    <FormControlLabel value="price" control={<Radio />} label="Price" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Filter