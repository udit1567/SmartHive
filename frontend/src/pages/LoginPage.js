import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "./useTokens";  // Import the useToken hook
import "./LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);  // Loading state
    const navigate = useNavigate();  // Hook for navigation

    // Use the custom hook to manage token state
    const { setToken } = useToken();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!email || !password) {
            setErrorMessage("Both fields are required.");
            return;
        }
        
        setErrorMessage("");  // Clear previous error
        setIsLoading(true);  // Start loading

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                email,
                password,
            });

            if (response.status === 200) {
                const { access_token, user_info ,uid } = response.data;
                setToken(access_token); 
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("email", JSON.stringify(email));
                localStorage.setItem("id", uid);
                alert("Login successful!");
                navigate("/dashboard");

            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Invalid email or password.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container hero-section">
            <div className="login-form">
                <h2>Build.io</h2>
                
                {/* Display error message if any */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="signup-link">
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
