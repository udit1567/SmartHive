import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';  // Your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot

root.render(
  <Router>  {/* Wrap your entire app with BrowserRouter here */}
    <App />
  </Router>
);
