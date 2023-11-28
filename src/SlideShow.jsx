import React from 'react'
import { Fade } from 'react-slideshow-image';
import { useEffect, useState } from 'react';
import './slide.css'

export const SlideShow = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '100%',
    }
    const slideImages = [
        {
            url: 'https://media.cntraveler.com/photos/599dd39ae74489198b4e3080/16:9/w_1920,c_limit/Flight-Deals_GettyImages-126346910.jpg',
            caption: 'Slide 1'
        },
        {
            url: 'https://c4.wallpaperflare.com/wallpaper/393/536/1/the-sky-clouds-flight-lights-wallpaper-preview.jpg',
            caption: 'Slide 2'
        },
        {
            url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            caption: 'Slide 3'
        },
    ];
    useEffect(() => {
        setTimeout(() => {
            setSlideIndex((slideIndex + 1) % 3)
        }, 5000)
    })
    return (
        <div style={{ ...divStyle, 'height': '100%', 'width': '100%', 'backgroundImage': `url(${slideImages[slideIndex].url})` }}>

            <div className="buttons">

            </div>
        </div>
    )
}
