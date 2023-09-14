import React from 'react';
import './login.css'
const Login = () => {
    return ( 
    <div id="login-container">
      <div id="body">
        <div class="container">
          <div class="logo">
            <div class="logo-header">
              <h1>Flight Booking</h1>
            </div>
          </div>
          <div class="col">
            <h1>
              Signup <em>now </em> and get started
            </h1>
            <form action="#" id="form" class="content">
              <div class="row">
                <div class="input">
                  <label for="first name">FIRST NAME</label>
                  <input type="text" placeholder="" id="first name" required />
                </div>
                <div class="input">
                  <label for="last name">LAST NAME</label>
                  <input type="text" placeholder="" id="last name" required />
                </div>
              </div>
              <div class="row">
                <div class="input">
                  <label for="first name">EMAIL</label>
                  <input type="email" placeholder="" id="first name" required />
                </div>
                <div class="input">
                  <label for="last name">PHONE NUMBER</label>
                  <input type="tel" placeholder="" id="last name" required />
                </div>
              </div>
              <div class="row">
                <div class="input">
                  <label for="first name">PASSWORD</label>
                  <input type="password" placeholder="" id="first name" required />
                </div>
                <div class="input">
                  <label for="last name">CONFIRM PASSWORD</label>
                  <input type="password" placeholder="" id="last name" required />
                </div>
              </div>
            </form>
            <button form="form" type="submit">Create Account</button>
            <p>Already have an account? <a href="#">Log in</a></p>
          </div>
        </div>
      </div>
    </div>
       );
}
 
export default Login;


