import React, { useState } from "react";
import axios from "axios";

function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "Admin" && password === "123") {
            onLogin(true);
        } else {
            setMessage("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h2 className="text-center text-primary mb-4">Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
            {message && (
                <div className="alert alert-danger mt-4" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
}

export default AdminLogin;
