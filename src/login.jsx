import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import './login.css';
import apiClient from "./http/apiClient";
import ErrorIcon from "./icons/ErrorIcon";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const navigate = useNavigate();

            
    const onButtonClick = () => {

        if(email===""){
          setError("Email cannot be empty");
          return
      }
        if(password===""){
            setError("Password cannot be empty")
            return
        }
        else{

        const postData={
            "email":email,
            "password":password
        }
        apiClient.post("/auth/generate",postData).then((result) => {
            localStorage.setItem("token",result.data);
            console.log(localStorage.getItem("token"),result)
            navigate("/booking");
        }).catch((err) => {
            console.log(err);
            if(err&& err.response&&err.response.status===403){
                setError("Please check your login credentials")
            }
            else{
              setError("internal server error Plaese try again")
            }
        });
        return
    }
    }
        return (
            <div className="login-container">
              <h2>Login</h2>
              <div className="input-container">
                <input
                  type="email" // Change the input type to "email"
                  placeholder="Email" // Update the placeholder
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {error!==""&&
        <div className="error-message">
        <ErrorIcon className="icon"/>
        <div>
            {error}
            </div>
        </div>}
              <button className="login-button" onClick={onButtonClick}>
                Login
              </button>
              <br />
              <br />
              <div>Not a customer? Register <Link to="/register">here</Link></div>
              <div>forgot password? <Link to="/forgot">here</Link></div>
            </div>
    );
};
    

export default Login