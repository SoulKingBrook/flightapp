import React, { useState } from "react";
import { Link } from "react-router-dom";
import './registration.css';
import apiClient from "./http/apiClient";
import ErrorIcon from "./icons/ErrorIcon";
import SuccessIcon from "./icons/SuccessIcon"
import { SlideShow } from "./SlideShow";


const AdminRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const registerUser = () => {
    if (email === "") {
      setError("Email cannot be empty");
    } else if (password === "") {
      setError("Password cannot be empty");
    } else if (confirmPassword === "") {
      setError("please re enter your password");
    } else if (mobile === "") {
      setError("please enter mobile no");
    } else if (password !== confirmPassword) {
      setError("passwords dont match");
    } else {
      const postData = {
        email: email,
        password: password,
        mobile: mobile,
      };
      apiClient
        .post("/auth/registerAdmin", postData)
        .then((response) => {
          console.log(response);
          if (response.data.successMsg !== null) {
            setSuccessMsg(response.data.successMsg);
            setError(null);
          } else {
            setError(response.data.errorMsg);
            setSuccessMsg(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err.data);
        });
    }
  };
  const onChange = (type, value) => {
    if (type === "mobile" && !isNaN(value) && value.length <= 10) {
      if (value.length < 10) {
        setError("enter atleast 10 numbers")
      }
      else {
        setError(null)
      }
      setMobile(value)
    }
    else if (type === "password") {
      let format = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
      console.log(format.test(value), value)
      if (!format.test(value)) {
        setError("Password must contain a special character Uppercase and number");
      }
      else {
        setError(null)
      }
      setPassword(value);
    }
    else if (type === "email") {
      //let format=new RegExp(`^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`);
      //console.log(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),value)
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)) {
        setError("enter a valid email");
      }
      else {
        setError(null)
      }
      setEmail(value);
    }
    else if (type === "confirmpassword") {
      if (value !== password) {
        setError("Passwords dont match ")
      }
      else {
        setError(null)
      }
      setConfirmPassword(value)
    }
  }
  const disabled = () => {
    return !(email !== "" && password !== "" && mobile !== "" && error == null)
  }

  return (
    <div className="main-container">
      <div className="slideshow">
        <SlideShow />
      </div>
      <div className="registration-container">
        <h2>Admin Register</h2>

        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="tel"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => onChange("mobile", e.target.value)}
          />

        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => onChange("confirmpassword", e.target.value)}
          />
        </div>
        {error !== null && (
          <div className="error-message">
            <ErrorIcon className="icon" />
            <div>{error}</div>
          </div>
        )}
        {successMsg !== null && (
          <div className="error-message">
            <SuccessIcon className="icon" />
            <div>{successMsg}</div>
          </div>
        )}
        <button className="register-button" onClick={registerUser} disabled={disabled()}>
          Register
        </button>
        <br />
        <br />
        <div>already a customer? login <Link to="/admin/login">here</Link></div>
      </div>
    </div>
  );
};

export default AdminRegistration;