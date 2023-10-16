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
      <circle cx="25" cy="25" r="25" fill="#25AE88"></circle>
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M38 15L22 33 12 25"
      ></path>
    </svg>
  );
}

export default ErrorIcon;
