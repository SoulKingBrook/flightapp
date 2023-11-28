import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './login.css';
import apiClient from "./http/apiClient";
import ErrorIcon from "./icons/ErrorIcon";
import { useContext } from "react";
import { LoginContext } from "./Context/LoginContext";
import { SlideShow } from "./SlideShow";

const AdminLogin = ({ setIsAdmin }) => {
  const { setSessionUser, setToken, setTimeLeft } = useContext(LoginContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();


  const onButtonClick = () => {

    if (email === "") {
      setError("Email cannot be empty");
      return
    }
    if (password === "") {
      setError("Password cannot be empty")
      return
    }
    else {

      const postData = {
        "email": email,
        "password": password
      }
      apiClient.post("/auth/generateAdmin", postData).then((result) => {
        setToken(result.data);
        setSessionUser(email);
        setTimeLeft(600);
        setIsAdmin(true);
        navigate("/admin/cancelbookings");
      }).catch((err) => {
        console.log(err);
        if (err && err.response && err.response.status === 403) {
          setError("Please check your login credentials or admin access")
        }
        else {
          setError("internal server error Please try again")
        }
      });
      return
    }
  }


  const onChange = (type, value) => {

    if (type === "password") {
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
      //console.log(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value), value)
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)) {
        setError("enter a valid email");
      }
      else {
        setError(null)
      }
      setEmail(value);
    }
  }
  return (
    <div className="main-container">
      <div className="slideshow">
        <SlideShow />
      </div>
      <div className="login-container">
        <h2>Admin Login</h2>
        <div className="input-container">
          <input
            type="email" // Change the input type to "email"
            placeholder="Email" // Update the placeholder
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
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
        {error !== null &&
          <div className="error-message">
            <ErrorIcon className="icon" />
            <div>
              {error}
            </div>
          </div>}
        <button className="login-button" onClick={onButtonClick}>
          Login
        </button>
        <div className="row">
          <Link to="/admin/register">Register</Link>
          <Link to="/">Go Back to home</Link>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin