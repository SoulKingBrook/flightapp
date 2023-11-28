import React from 'react'
import PersonalInfo from './personalInfo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./personal.css"

const PersonalInfoPage = () => {

    const [searchParams] = useSearchParams();
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const confirmBooking = () => {
        navigate(`/payment/?id=${id}`)
    }

    return (
        <div className='personalInfoContainer'>
            {
                [...Array(+adults)].map((r, i) => {
                    return < PersonalInfo title={"Adult" + "  " + (i + 1)} key={i} />
                })
            }
            {
                [...Array(+children)].map((r, i) => {
                    return <PersonalInfo title={"Child" + "  " + (i + 1)} />
                })
            }
            {
                [...Array(+infants)].map((r, i) => {
                    return <PersonalInfo title={"Infant" + "  " + (i + 1)} />
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