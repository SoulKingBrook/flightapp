import React, { useContext, useEffect, useState } from 'react'
import "./flights.css"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material'
import { FlightContext } from './Context/FlightContext'

const Filter = ({ priceRange, departureTimeRange, departureTimeValues, priceValue, setPriceValue, setDepartureTimeValues, setSortBy, sortBy }) => {

    return (
        <div className='filter'>
            <h3>Price Range</h3>
            <p>{priceRange[0] + ' $ -  ' + priceRange[1] + ' $'}</p>
            <Slider style={{ 'color': '#a564b1' }} value={priceValue} min={priceRange[0]} max={priceRange[1]} onChange={(e, v) => { setPriceValue(v) }} valueLabelDisplay="on" />

            <h3>Departure Time Range</h3>
            <p>{new Date(departureTimeValues[0]).toLocaleTimeString('en-GB') + ' - ' + new Date(departureTimeValues[1]).toLocaleTimeString('en-GB')}</p>
            <Slider style={{ 'color': '#a564b1' }} value={departureTimeValues} min={departureTimeRange[0]} max={departureTimeRange[1]} onChange={(e, v) => { setDepartureTimeValues(v) }} valueLabelDisplay="off" />

            <br />
            <FormControl >
                <FormLabel id="demo-controlled-radio-buttons-group"><h3>Sort By</h3></FormLabel>
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