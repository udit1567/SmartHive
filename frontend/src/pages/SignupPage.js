import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import './SignUpPage.css';

const SignUpPage = ({ onSignupSuccess = () => {} }) => {
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
    const [isLoading, setIsLoading] = useState(false);

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
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                onSignupSuccess(data);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-container">
                    {/* Header Section */}
                    <div className="signup-header">
                        
                        <h2 className="header-title">Create Account</h2>
                        <p className="header-subtitle">Join us today!</p>
                    </div>

                    {/* Form Section */}
                    <div className="signup-form-container">
                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-input"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-input"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-input"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-input"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">How did you hear about us?</label>
                                    <select
                                        name="source"
                                        className="form-select"
                                        value={formData.source}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select an option</option>
                                        <option value="friend">Friend</option>
                                        <option value="advertisement">Advertisement</option>
                                        <option value="socialMedia">Social Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-textarea"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="login-section">
                            Already have an account?
                            <a href="/login" className="login-link">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;



// import React, { useState } from "react";
// import axios from "axios";
// import "./SignUpPage.css";

// const SignUpPage = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         firstName: "",
//         lastName: "",
//         source: "",
//         password: "",
//         address: "",
//     });

//     const [errorMessage, setErrorMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { username, email, firstName, lastName, password, address, source } = formData;

//         if (!username || !email || !firstName || !lastName || !password || !address || !source) {
//             setErrorMessage("Please fill in all the fields.");
//         } else {
//             setErrorMessage("");
//             try {
//                 // Send data to Flask backend
//                 const response = await axios.post("http://localhost:5000/signup", formData);
//                 alert(response.data.message);
//             } catch (error) {
//                 setErrorMessage(error.response?.data?.message || "Something went wrong.");
//             }
//         }
//     };

//     return (
//         <div className="signup-container">
//             <div className="signup-form">
//                 <h2>Register Account</h2>
//                 {errorMessage && <div className="error-message">{errorMessage}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="firstName">First Name</label>
//                         <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="lastName">Last Name</label>
//                         <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="source">How did you hear about us?</label>
//                         <select
//                             id="source"
//                             name="source"
//                             value={formData.source}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select</option>
//                             <option value="friend">Friend</option>
//                             <option value="advertisement">Advertisement</option>
//                             <option value="socialMedia">Social Media</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="address">Address</label>
//                         <textarea
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="submit-btn">
//                         Sign Up
//                     </button>
//                 </form>
//                 Already have an account
//                 <a href="/login" className="btn"> login ?</a>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;
