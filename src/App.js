import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import only Routes and Route, no need for Router here
import HomePage from './pages/HomePage';
import DashboardPage from './Dashboard/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import './styles.css';
import Add_device from './Dashboard/Add_device';
import Setting from './Dashboard/Setting';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add" element={<Add_device />} />
        <Route path="/setting" element={<Setting />} />
        

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
