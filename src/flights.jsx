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
    const [currentState, setCurrentState] = useState("onewaytrip")
    const [currentFlightSource, setCurrentFlightSource] = useState(searchParams.get("from"))
    const [currentFlightDest, setCurrentFlightDest] = useState(searchParams.get("to"))
    const [currentFlightDate, setCurrentFlightDate] = useState(searchParams.get("departureDate"));
    const { flights, setFlights } = useContext(FlightContext);
    const [firstTripId, setFirstTripId] = useState(null)
    const findTrips = async (id) => {
        await resetFilters();
        if (currentState === "roundtrip") {
            let x = currentFlightSource
            let adults = searchParams.get("adults");
            let children = searchParams.get("children");
            let infants = searchParams.get("infants");
            setCurrentFlightSource(currentFlightDest)
            setCurrentFlightDest(x)
            setCurrentFlightDate(searchParams.get("arrivalDate"))
            if (firstTripId != null) {
                navigate(`/priceBreakdown/?id=${id},${firstTripId}&adults=${adults}&children=${children}&infants=${infants}`)
            }
            else {
                setFirstTripId(id)
            }
        }
        else {
            let adults = searchParams.get("adults");
            let children = searchParams.get("children");
            let infants = searchParams.get("infants");
            navigate(`/priceBreakdown/?id=${id}&adults=${adults}&children=${children}&infants=${infants}`)
        }
    }


    const [priceRange, setPriceRange] = useState([0, 0])
    const [departureTimeRange, setDepartureTimeRange] = useState([-1, -1])
    const [departureTimeValues, setDepartureTimeValues] = useState([-1, -1])
    const [priceValue, setPriceValue] = useState(0);
    const [initialFlights, setInitialFlights] = useState(null)
    const [currentFlights, setCurrentFlights] = useState(null)
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
        if (isFetched && initialFlights != null) {
            let x = initialFlights['legs'].map(flight => flight.prices.price.totalAmountUsd);
            if (x.length == 0) { return }
            console.log(x.reduce((a, b) => Math.min(a, b)))
            setPriceRange([x.reduce((a, b) => Math.min(a, b)), x.reduce((a, b) => Math.max(a, b))])
            setPriceValue(x.reduce((a, b) => Math.max(a, b)));

            let y = initialFlights['legs'].map(flight => convertTimeString(flight.departureTime))
            setDepartureTimeRange([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setDepartureTimeValues([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setSortBy("")
        }
    }

    useEffect(() => {
        if (isFetched && initialFlights != null) {
            let x = initialFlights['legs'].filter(flight => flight.departureAirportCode === currentFlightSource).map(flight => flight.prices.price.totalAmountUsd);
            if (x.length == 0) {
                return
            }
            console.log(x.reduce((a, b) => Math.min(a, b)))
            setPriceRange([x.reduce((a, b) => Math.min(a, b)), x.reduce((a, b) => Math.max(a, b))])
            setPriceValue(x.reduce((a, b) => Math.max(a, b)));

            let y = initialFlights['legs'].map(flight => convertTimeString(flight.departureTime))
            setDepartureTimeRange([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])
            setDepartureTimeValues([y.reduce((a, b) => Math.min(a, b)), y.reduce((a, b) => Math.max(a, b))])

        }
    }, [initialFlights, currentFlightSource])

    useEffect(() => {
        if (initialFlights != null) {
            let x = initialFlights['legs'].filter(flight => flight.prices.price.totalAmountUsd <= priceValue)
            let y = { ...currentFlights }
            y.legs = x
            setCurrentFlights(y)
        }
    }, [priceValue])
    useEffect(() => {
        console.log(initialFlights)
        if (initialFlights != null) {
            let x = initialFlights['legs'].filter(flight => convertTimeString(flight.departureTime) <= departureTimeValues[1] && convertTimeString(flight.departureTime) >= departureTimeValues[0])
            let y = { ...currentFlights }
            y.legs = x
            setCurrentFlights(y)
        }
    }, [departureTimeValues])
    useEffect(() => {
        if (currentFlights != null) {
            if (sortBy === "price") {
                let x = [...currentFlights.legs].sort((a, b) => a.prices.price.totalAmountUsd - b.prices.price.totalAmountUsd)
                let y = { ...currentFlights }
                y.legs = x
                if (y != currentFlights) {
                    setCurrentFlights(y)
                }
            }
            else if (sortBy === "departureTime") {
                let x = [...currentFlights.legs].sort((a, b) => convertTimeString(a.departureTime) - convertTimeString(b.departureTime))
                let y = { ...currentFlights }
                y.legs = x
                if (y != currentFlights) {
                    setCurrentFlights(y)
                }
            }
        }
    }, [sortBy])


    // useEffect(() => {

    //     const fetchData = async () => {
    //         if (!isFetched) {
    //             let tripData = searchParams.get("trip")
    //             let getData = null
    //             let departureDate = searchParams.get("departureDate").split('-').reverse().join('-');
    //             if (tripData === "onewaytrip") {

    //                 getData = {
    //                     "source": searchParams.get("from"),
    //                     "destination": searchParams.get("to"),
    //                     "departureDate": departureDate,
    //                     "noOfAdults": searchParams.get("adults"),
    //                     "noOfChildren": searchParams.get("children"),
    //                     "noOfInfants": searchParams.get("infants"),
    //                     "trip": tripData,
    //                     "bookingClass": searchParams.get("class")
    //                 }
    //             }
    //             else {
    //                 let arrivalDate = searchParams.get("arrivalDate").split('-').reverse().join('-')
    //                 getData = {
    //                     "source": searchParams.get("from"),
    //                     "destination": searchParams.get("to"),
    //                     "departureDate": departureDate,
    //                     "arrivalDate": arrivalDate,
    //                     "noOfAdults": searchParams.get("adults"),
    //                     "noOfChildren": searchParams.get("children"),
    //                     "noOfInfants": searchParams.get("infants"),
    //                     "trip": tripData,
    //                     "bookingClass": searchParams.get("class")
    //                 }
    //             }

    //             apiClient.defaults.headers.common = { "Authorization": `Bearer ${token}` }
    //             await apiClient.post("/app/flights", getData).then(result => {
    //                 console.log(result)
    //                 let x = { ...result.data }

    //                 setFlights(result.data)
    //                 setCurrentFlights(x)
    //                 setInitialFlights(x)
    //                 setCurrentState(searchParams.get("trip"))
    //                 setFetched(true)
    //             }).catch((err) => {
    //                 console.log(err)
    //                 if (err && err.response && err.response.status === 403) {
    //                     navigate("/login")
    //                 }
    //             })
    //         }
    //     }
    //     fetchData();
    // }

    //     , [])

    useEffect(() => {
        let x = { ...flightData }
        setFlights(flightData)
        setCurrentFlights(x)
        setInitialFlights(x)
        setCurrentState(searchParams.get("trip"))
        console.log(flightData)
        setFlights(flightData)
        setFetched(true)
    }, [])
    return (

        <div className='container'>
            {
                isFetched &&
                <div className='flightsContainer'>
                    <div className="infoContainer">
                        <h2>{currentFlightSource}</h2>

                        <div style={{ "height": "50px", "width": "50px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" style={{ "enable-background": "new 0 0 512.001 512.001" }} space="preserve"><path style={{ "fill": "#ff5948" }} d="M504.159 244.186c.28 14.657-12.068 26.653-26.726 26.653H98.126c-36.356 0-65.829-29.472-65.829-65.829v-7.993l-23.556-71.51a2.09 2.09 0 0 1 1.985-2.744h49.079a2.09 2.09 0 0 1 1.876 1.168l30.282 61.633h308.778c16.833 0 30.48 13.646 30.48 30.48 0 .69.282 1.317.731 1.776.46.449 1.087.731 1.776.731h44.293c14.269.001 25.866 11.43 26.138 25.635z" /><path style={{ "fill": "#d44a3c" }} d="M54.24 205.01v-7.993l-23.557-71.511a2.09 2.09 0 0 1 1.985-2.744H10.726a2.09 2.09 0 0 0-1.985 2.744l23.557 71.511v7.993c0 36.356 29.472 65.829 65.829 65.829h21.943c-36.356 0-65.83-29.472-65.83-65.829z" /><path style={{ "fill": "#36c8e3" }} d="M433.726 218.552H382.95c-9.132 0-16.536-7.403-16.536-16.535v-16.452h34.325c16.833 0 30.48 13.646 30.48 30.48 0 .69.282 1.317.731 1.776.46.449 1.088.731 1.776.731z" /><path style={{ "fill": "#bf4436" }} d="M334.294 335.874h-87.123c-8.867 0-16.055-7.188-16.055-16.055s7.188-16.055 16.055-16.055h87.123a2.09 2.09 0 0 1 2.09 2.09v27.93a2.09 2.09 0 0 1-2.09 2.09z" /><path style={{ "fill": "#ffd359" }} d="M334.294 335.874h-21.345v-32.11h21.345a2.09 2.09 0 0 1 2.09 2.09v27.93a2.09 2.09 0 0 1-2.09 2.09z" /><path style={{ "fill": "#d44a3c" }} d="m233.26 248.773-70.946 134.951c-1.317 2.505.499 5.513 3.33 5.513h66.591a3.763 3.763 0 0 0 3.189-1.766l84.46-134.951c1.568-2.506-.233-5.757-3.189-5.757h-80.104a3.756 3.756 0 0 0-3.331 2.01z" /><path style={{ "fill": "#bf4436" }} d="m185.975 383.723 70.946-134.951a3.76 3.76 0 0 1 3.33-2.011h-23.663a3.763 3.763 0 0 0-3.33 2.011l-70.946 134.951c-1.317 2.505.499 5.513 3.33 5.513h23.663c-2.83-.001-4.647-3.008-3.33-5.513z" /><path style={{ "fill": "#d44a3c" }} d="M43.888 212.347 7.836 265.864h53.275l47.552-53.517z" /><path style={{ "fill": "#bf4436" }} d="M43.888 212.347 7.836 265.864h26.463l36.052-53.517z" /><circle cx="177.706" cy="212.345" r="7.837" /><circle cx="223.88" cy="212.345" r="7.837" /><circle cx="270.064" cy="212.345" r="7.837" /><circle cx="316.238" cy="212.345" r="7.837" /><path d="M478.02 210.72h-39.333c-.049-.349-.112-.694-.169-1.04-.037-.218-.067-.439-.107-.655a37.58 37.58 0 0 0-.296-1.411c-.024-.108-.044-.217-.069-.325a38.774 38.774 0 0 0-.443-1.706c-.046-.164-.101-.324-.149-.486-.119-.398-.237-.796-.369-1.189-.07-.209-.149-.414-.223-.621-.121-.342-.24-.684-.37-1.021-.086-.222-.18-.438-.27-.657-.13-.318-.257-.636-.396-.951-.098-.224-.205-.442-.307-.663-.14-.303-.279-.607-.427-.906-.111-.224-.23-.443-.345-.665-.15-.289-.3-.579-.458-.864-.123-.223-.253-.44-.38-.659-.161-.278-.321-.556-.489-.83-.134-.218-.274-.432-.412-.647a33.12 33.12 0 0 0-.521-.798c-.144-.213-.295-.422-.443-.632-.182-.257-.364-.515-.552-.767a35.644 35.644 0 0 0-.472-.614 37.765 37.765 0 0 0-.583-.738 36.06 36.06 0 0 0-.502-.598 41.01 41.01 0 0 0-.61-.704 36.015 36.015 0 0 0-.531-.579 40.555 40.555 0 0 0-.638-.673 41.938 41.938 0 0 0-1.223-1.199c-.192-.181-.388-.358-.584-.535a36.28 36.28 0 0 0-1.3-1.12 37.054 37.054 0 0 0-2.093-1.605 36.333 36.333 0 0 0-2.885-1.871c-.23-.135-.461-.27-.694-.4-.27-.15-.542-.296-.816-.441-.236-.124-.471-.249-.709-.369a38.064 38.064 0 0 0-.84-.404 33.942 33.942 0 0 0-.726-.336 38.451 38.451 0 0 0-.862-.368c-.247-.102-.492-.207-.741-.304-.294-.115-.59-.223-.888-.33-.25-.091-.498-.184-.75-.27-.302-.102-.607-.196-.911-.292-.254-.079-.507-.161-.763-.235-.308-.089-.621-.169-.933-.251-.257-.067-.512-.138-.771-.2-.319-.076-.643-.142-.964-.211-.256-.054-.511-.113-.769-.162-.332-.064-.669-.115-1.004-.17-.253-.041-.504-.088-.758-.124-.355-.05-.714-.089-1.071-.13-.238-.027-.475-.061-.716-.084-.404-.039-.813-.063-1.221-.088-.196-.013-.392-.031-.589-.041a38.477 38.477 0 0 0-1.834-.044H270.06a7.837 7.837 0 0 0 0 15.672h88.519v8.614c0 13.437 10.934 24.37 24.372 24.37h95.07c9.904 0 18.114 8.05 18.303 17.944.091 4.784-1.767 9.364-5.234 12.896-3.597 3.667-8.575 5.77-13.658 5.77h-48.327a7.837 7.837 0 0 0 0 15.672h48.327c9.264 0 18.321-3.815 24.847-10.466 6.438-6.561 9.888-15.146 9.715-24.172-.352-18.371-15.593-33.317-33.974-33.317zm-103.769-8.699v-8.614h26.488c.604 0 1.2.03 1.792.077.099.007.199.014.297.023.563.052 1.121.125 1.672.218.108.018.214.038.322.057.557.102 1.11.219 1.652.362l.166.047c.525.142 1.041.302 1.549.48.069.024.14.046.209.071a22.587 22.587 0 0 1 1.822.752c.493.229.978.472 1.451.735.075.042.149.087.225.13.47.268.931.548 1.379.847l.083.053c.46.309.904.639 1.337.981.078.062.158.122.235.185.417.336.822.688 1.214 1.052.073.068.145.138.217.208.399.381.788.772 1.159 1.181l.064.074c.359.4.702.816 1.033 1.241.052.067.106.132.157.199.326.429.635.871.931 1.324l.171.267c.29.459.568.928.826 1.407l.1.196c.248.472.48.953.694 1.444.022.051.047.1.069.152.217.508.413 1.028.592 1.554.034.101.07.203.103.305a22.07 22.07 0 0 1 .48 1.692h-39.793c-4.793-.001-8.696-3.904-8.696-8.7z" /><path d="M386.79 238.926H149.599a7.837 7.837 0 0 0 0 15.672h71.745L216.926 263h-118.8a58.06 58.06 0 0 1-20.624-3.786l37.02-41.659a7.837 7.837 0 0 0-5.858-13.042H43.888a7.834 7.834 0 0 0-3.744.957c-.001-.154-.008-.305-.008-.459v-7.993c0-.833-.133-1.66-.393-2.451l-11.938-36.245h42.036l15.086 30.701a7.838 7.838 0 0 0 7.033 4.38h124.082a7.837 7.837 0 0 0 0-15.672h-119.2l-28.132-57.25a9.87 9.87 0 0 0-8.911-5.542H10.731a9.952 9.952 0 0 0-8.058 4.122 9.919 9.919 0 0 0-1.37 8.903l8.161 24.778c.023.075.049.149.074.224l14.924 45.312v6.736c0 6.323.809 12.563 2.384 18.609L1.337 261.485A7.836 7.836 0 0 0 7.836 273.7H61.11a7.832 7.832 0 0 0 5.393-2.161 73.698 73.698 0 0 0 31.623 7.134h110.559l-37.573 71.466-.006.013-15.729 29.916a11.506 11.506 0 0 0 .339 11.394 11.51 11.51 0 0 0 9.928 5.601h66.59a11.53 11.53 0 0 0 9.831-5.445l29.991-47.915h40.833c.021 0 .04.003.061.003h21.345c5.473 0 9.927-4.452 9.927-9.925v-27.93c0-5.473-4.453-9.925-9.927-9.925h-32.332l10.797-17.249h62.704a7.837 7.837 0 0 0 0-15.672h-52.895l3.958-6.323c.415-.662.731-1.364 1-2.079h59.264c4.328 0 7.837-3.509 7.837-7.836s-3.51-7.841-7.838-7.841zM56.224 130.612l5.916 12.039H22.642l-3.965-12.039h37.547zm-8.166 89.574h43.16l-32.193 36.229c-.064.068-.124.139-.186.209l-1.247 1.403H22.564l25.494-37.841zm181.919 161.203h-57.589l10.346-19.676h59.558l-12.315 19.676zm98.57-69.792v16.432h-7.762v-16.432h7.762zm-23.435-.003v16.435h-23.247l10.287-16.435h12.96zm-53.011 34.447h-61.128l37.538-71.398c.038-.068.073-.137.109-.207l10.43-19.839h70.285l-57.234 91.444z" /><path d="M51.958 327.651h109.917a7.837 7.837 0 0 0 0-15.672H51.958a7.837 7.837 0 0 0 0 15.672zM45.845 361.622H25.209a7.837 7.837 0 0 0 0 15.672h20.636a7.837 7.837 0 0 0 0-15.672zM135.126 361.622H98.22a7.837 7.837 0 0 0 0 15.672h36.906a7.837 7.837 0 0 0 0-15.672z" /></svg>                        </div>

                        <h2>{currentFlightDest}</h2>
                        <h2>On   {currentFlightDate}</h2>
                    </div>
                    <br />
                    <br />
                    <br />

                    {currentFlights && currentFlights['legs'] &&
                        currentFlights['legs'].length > 0 &&
                        currentFlights['legs'].filter(flight => flight.departureAirportCode === currentFlightSource).map(
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