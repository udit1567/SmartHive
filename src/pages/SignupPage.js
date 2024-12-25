import React, { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        source: "",
        password: "",
        address: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, firstName, lastName, password, address, source } = formData;

        if (!username || !email || !firstName || !lastName || !password || !address || !source) {
            setErrorMessage("Please fill in all the fields.");
        } else {
            setErrorMessage("");
            try {
                // Send data to Flask backend
                const response = await axios.post("http://localhost:5000/signup", formData);
                alert(response.data.message);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || "Something went wrong.");
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Register Account</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="source">How did you hear about us?</label>
                        <select
                            id="source"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="friend">Friend</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="socialMedia">Social Media</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Sign Up
                    </button>
                </form>
                Already have an account
                <a href="/login" className="btn"> login ?</a>
            </div>
        </div>
    );
};

export default SignUpPage;
