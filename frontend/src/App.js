import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import DashboardPage from './Dashboard/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import Navbar from './Components/Navbar';
import './styles.css';
import Add_device from './Dashboard/Add_device';
import Setting from './Dashboard/Setting';
import ProfilePage from "./pages/ProfilePage";
import useToken from './pages/useTokens';
import AdminPanel from './pages/AdminPanel';
import ObjectDetection from './pages/ObjectDetection';

function App() {
  const { token, setToken } = useToken();
  const location = useLocation(); // Get current route

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ["/signup", "/login", "/"];

  return (
    <>
      {/* Conditionally render navbar based on route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage token={token} setToken={setToken} />} />
          <Route path="/profile/:email" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage token={token} setToken={setToken} />} />
          <Route path="/add" element={<Add_device />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/obj' element={<ObjectDetection />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
