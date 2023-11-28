import React from 'react'
import "./AboutUs.css"
import { useState } from 'react'
const AboutUs = () => {

  const [current, setCurrent] = useState("baggage")
  let data = {
    baggage: {
      heading: "Baggage",
      listElements: [
        "Two Large Bags allowed",
        "Upto 1 Carry On",
        "No Liquid Items",
        "Flexibility to buy for extra baggage allowance",
        "Refund for damaged baggage"
      ]
    },
    faq: {
      heading: "FAQ",
      listElements: [
        "COVID 19 Info",
        "On Board Experience",
        "Flexibility to cancel bookings",
        "Special Entrance"
      ]
    },
    terms: {
      heading: "Terms & Conditions",
      listElements: [
        "Adult is a person with age > 12 years 1 day",
        "Baggage Check",
        "E-ticket or ticket",
        "Baggage Identification Tag"
      ]
    }
  }
  return (
    <div className='about-container'>
      <div className="about-tabs-container">
        <div className='about-tab' onClick={() => { setCurrent("baggage") }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTREJiQt-LN4OuL0b-S9lbrgnr65WzM5u9Mjg&usqp=CAU" />
        </div>
        <div className='about-tab' onClick={() => { setCurrent("faq") }}>
          <img src="https://st4.depositphotos.com/16835446/27074/v/450/depositphotos_270742364-stock-illustration-faq-chat-bubble-ask-dialog.jpg" />
        </div>
        <div className='about-tab' onClick={() => { setCurrent("terms") }}>
          <img src="https://thumbs.dreamstime.com/b/terms-conditions-text-legal-agreement-document-terms-conditions-text-legal-agreement-document-service-125737491.jpg" />
        </div>
      </div>
      <div className="about-list-container">
        <h2>{data[current].heading}</h2>
        <ul>
          {
            data[current].listElements.map(e => {
              return <li>{e}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default AboutUs;