import React from 'react'
import InfoIcon from './icons/InfoIcon'
import "./tooltip.css"
import { useState } from 'react'
import { useEffect } from 'react'

const Tooltip = ({ stopCodes }) => {

    const [showStops, setShowStops] = useState(false)
    useEffect(() => {

    }, [])
    return (
        <div className='tooltip-container' onMouseEnter={() => setShowStops(true)} onMouseLeave={() => setShowStops(false)}>
            <InfoIcon />
            {showStops &&

                <div className='showStops'>
                    {
                        stopCodes.length > 0 &&
                        stopCodes.reduce((a, b) => a + ',' + b)
                        ||
                        "Direct Flight"
                    }
                </div>
            }
        </div>

    )
}

export default Tooltip