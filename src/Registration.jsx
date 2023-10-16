import React, { useState } from "react";
import { Link } from "react-router-dom";
import './registration.css';
import apiClient from "./http/apiClient";
import ErrorIcon from "./icons/ErrorIcon";
import SuccessIcon from "./icons/SuccessIcon"


const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("");
    const [confirmPassword,setConfirmPassword]=useState("")
    const [error, setError] = useState(null)
    const [successMsg,setSuccessMsg]=useState(null)

    

            
    const registerUser = () =>{

      if(email===""){
        setError("Email cannot be empty");
        return
    }
    if(password===""){
        setError("Password cannot be empty")
        return
    }
    if(confirmPassword===""){
      setError("please re enter your password");
      return
  }
  if(mobile===""){
      setError("please enter mobile no");
      return
  }
  else{
      const postData={
        "email":email,
        "password":password,
        "mobile":mobile
      }
      apiClient.post("/auth/register",postData).then(
        response=>{
          console.log(response)
          if(response.data.successMsg!==null){
          setSuccessMsg(response.data.successMsg);
          setError(null)
          }
          else{
            setError(response.data.errorMsg);
            setSuccessMsg(null);
          }
        }
      ).catch(err=>{
        console.log(err)
        setError(err.data)
      })

    }
    }

    return (
      <div className="registration-container">
        <h2>Register</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error!==null&&
  <div className="error-message">
  <ErrorIcon className="icon"/>
  <div>
      {error}
      </div>
  </div>}
  {successMsg!==null&&
  <div className="error-message">
  <SuccessIcon className="icon"/>
  <div>
      {successMsg}
      </div>
  </div>}
    <button
    className="register-button"
    onClick={registerUser}
    >Register</button>
  <Link to="/login"></Link>
      </div>);
};

export default Registration;