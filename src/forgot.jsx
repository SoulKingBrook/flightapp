import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import ErrorIcon from "./icons/ErrorIcon";

const Forgot = (props) => {
  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate();


  const onButtonClick = () => {

    if (password === "") {
      setError("password cannot be empty");
      return
    }
    if (password1 === "") {
      setError("confirm Password cannot be empty")
      return
    }
    else if (password !== password1) {
      setError("passwords dont match")
      return
    }
    else {
      navigate("/login")
    }
  }
  return (
    <div className="login-container">
      <h2>Change Pasword</h2>
      <div className="input-container">
        <input
          type="password" // Change the input type to "email"
          placeholder="password" // Update the placeholder
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="confirm Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
      </div>
      {error !== "" &&
        <div className="error-message">
          <ErrorIcon className="icon" />
          <div>
            {error}
          </div>
        </div>}
      <button className="login-button" onClick={onButtonClick}>
        Change Password
      </button>
    </div>
  );
};


export default Forgot