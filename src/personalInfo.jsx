import React, { useState } from 'react';
import "./personal.css"

const PersonalInfo = ({ title, setPassengers, passengers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        let x = { ...passengers }
        x[title] = { "fullName": fullName, "mobile": mobile, "age": age }
        setPassengers(x)
        setIsOpen(false)
    };
    const svg = () => {
        return (
            <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333 c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333 z"></path> <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17 l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17 C369.42,189.917,355.913,189.917,347.582,198.248z"></path> </g> </g> </g> </g></svg>
        )
    }

    return (
        <div className='accordionContainer'>
            <div
                style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc', "borderRadius": "8px", "backgroundColor": "white", "display": "flex", "justifyContent": "space-between" }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {svg()}
            </div>
            {isOpen && (
                <div style={{ padding: '10px', "backgroundColor": "white" }}>
                    <form onSubmit={handleSubmit}>

                        <div style={{ marginBottom: '10px' }}>
                            <label>Full Name</label>
                            <input
                                type='text'
                                name='Full Name'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <label>Mobile info</label>
                            <input
                                type='mobile'
                                name='mobile'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}

                            />
                            <label>Age</label>
                            <input
                                type='number'
                                name='Age'
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};



export default PersonalInfo;
