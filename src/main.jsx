import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocoinProvider } from './context/ContextProvider';
import { AnonAadhaarProvider } from "@anon-aadhaar/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AnonAadhaarProvider _useTestAadhaar={true}>
  <SocoinProvider>
    <App />
  </SocoinProvider>
  </AnonAadhaarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
