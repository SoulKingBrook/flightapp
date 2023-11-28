import React, { useState } from 'react'
import "./counter.css"

const Counter = ({ baggage, setBaggage }) => {

    return (
        <div className='counter-container'>
            <button onClick={() => { if (baggage != 0) { setBaggage(baggage - 1) } }} className="counter-button">-</button>
            <div className="display">
                {baggage}
            </div>
            <button onClick={() => { setBaggage(baggage + 1) }} className="counter-button">+</button>
        </div>
    )
}

export default Counter