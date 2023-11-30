import React from 'react'
import PersonalInfo from './personalInfo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./personal.css"
import { useContext } from 'react';
import { LoginContext } from './Context/LoginContext';

const PersonalInfoPage = () => {

    const [searchParams] = useSearchParams();
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const { passengers, setPassengers } = useContext(LoginContext);
    const confirmBooking = () => {

        navigate(`/payment/?id=${id}`)
    }

    return (
        <div className='personalInfoContainer'>
            {
                [...Array(+adults)].map((r, i) => {
                    return < PersonalInfo title={"Adult" + "  " + (i + 1)} setPassengers={setPassengers} passengers={passengers} key={i} />
                })
            }
            {
                [...Array(+children)].map((r, i) => {
                    return <PersonalInfo title={"Child" + "  " + (i + 1)} setPassengers={setPassengers} passengers={passengers} key={i} />
                })
            }
            {
                [...Array(+infants)].map((r, i) => {
                    return <PersonalInfo title={"Infant" + "  " + (i + 1)} setPassengers={setPassengers} passengers={passengers} key={i} />
                })
            }
            <button onClick={confirmBooking}>Next</button>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default PersonalInfoPage