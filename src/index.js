import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDksx_Db8p7e94395ruf-ZiZFmEyV1BJMc",
  authDomain: "fir-efratdagan.firebaseapp.com",
  projectId: "fir-efratdagan",
  storageBucket: "fir-efratdagan.firebasestorage.app",
  messagingSenderId: "992742027112",
  appId: "1:992742027112:web:4b3c4db5243c4c42e830dd",
  measurementId: "G-Y62VR3NSRN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
