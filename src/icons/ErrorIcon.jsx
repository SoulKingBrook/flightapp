import React from "react";

function ErrorIcon() {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="25" 
      height="25"
    viewBox="0 0 50 50"
    xmlSpace="preserve"
  >
    <circle cx="25" cy="25" r="25" fill="#D75A4A"></circle>
    <path
      fill="none"
      stroke="#FFF"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M16 34L25 25 34 16"
    ></path>
    <path
      fill="none"
      stroke="#FFF"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M16 16L25 25 34 34"
    ></path>
  </svg>
  );
}

export default ErrorIcon;