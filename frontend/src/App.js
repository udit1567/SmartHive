import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import only Routes and Route, no need for Router here
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

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <>
    <Navbar />
    
    <div>
      <Routes>
        <Route exact path="/profile" element={<ProfilePage token={token} setToken={setToken}/>}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:email" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage token={token} setToken={setToken}/>} />
        <Route path="/add" element={<Add_device />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/admin' exact element={<AdminPanel />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
