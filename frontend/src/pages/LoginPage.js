import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserCircle } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ onLoginSuccess = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }
    
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access_token, uid } = data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("id", uid);
        alert("Login successful!");
        onLoginSuccess(data);

        navigate("/dashboard"); // Redirect to the home page after login
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-container">
          {/* Header Section */}
          <div className="login-header">
            <h2 className="header-title">SmartHive</h2>
            <p className="header-subtitle">Welcome back! Please login to continue</p>
          </div>

          {/* Form Section */}
          <div className="login-form-container">
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  <span className="loading-spinner">
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="signup-section">
              <p>
                Don't have an account?{' '}
                <a href="/signup" className="signup-link">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;




// import React, { useState } from 'react';
// import { UserCircle } from 'lucide-react';
// import './LoginPage.css';

// const LoginPage = ({ onLoginSuccess = () => {} }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setErrorMessage("Both fields are required.");
//       return;
//     }
    
//     setErrorMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/login", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const { access_token, uid } = data;
//         localStorage.setItem("access_token", access_token);
//         localStorage.setItem("email", JSON.stringify(email));
//         localStorage.setItem("id", uid);
//         alert("Login successful!");
//         onLoginSuccess(data);
//       } else {
//         throw new Error(data.error || 'Login failed');
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="login-container">
//           {/* Header Section */}
//           <div className="login-header">
//             {/* <div className="icon-container">
//               <UserCircle size={48} />
//             </div> */}
//             <h2 className="header-title">SmartHive</h2>
//             <p className="header-subtitle">Welcome back! Please login to continue</p>
//           </div>

//           {/* Form Section */}
//           <div className="login-form-container">
//             {errorMessage && (
//               <div className="error-message">
//                 {errorMessage}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="form-label">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="form-input"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="form-input"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="submit-button"
//               >
//                 {isLoading ? (
//                   <span className="loading-spinner">
//                     <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Logging in...
//                   </span>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             <div className="signup-section">
//               <p>
//                 Don't have an account?{' '}
//                 {/* <button
//                   onClick={() => window.location.href = '/signup'}
//                   className="signup-link"
//                 >
//                   Sign up


//                 </button> */}
//                 <a href="/signup" className="signup-link">
//                                 Sign Up
//                             </a>

//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import useToken from "./useTokens";  // Import the useToken hook
// import "./LoginPage.css";

// const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [uid, setid] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isLoading, setIsLoading] = useState(false);  // Loading state
//     const navigate = useNavigate();  // Hook for navigation

//     // Use the custom hook to manage token state
//     const { setToken } = useToken();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Basic client-side validation
//         if (!email || !password) {
//             setErrorMessage("Both fields are required.");
//             return;
//         }
        
//         setErrorMessage("");  // Clear previous error
//         setIsLoading(true);  // Start loading

//         try {
//             const response = await axios.post("http://127.0.0.1:5000/login", {
//                 email,
//                 password,
//             });

//             if (response.status === 200) {
//                 const { access_token, user_info ,uid } = response.data;
//                 setToken(access_token); 
//                 localStorage.setItem("access_token", access_token);
//                 localStorage.setItem("email", JSON.stringify(email));
//                 localStorage.setItem("id", uid);
//                 alert("Login successful!");
//                 navigate("/dashboard");

//             }
//         } catch (error) {
//             if (error.response) {
//                 setErrorMessage(error.response.data.error || "Invalid email or password.");
//             } else {
//                 setErrorMessage("An error occurred. Please try again later.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="login-container hero-section">
//             <div className="login-form">
//                 <h2>Build.io</h2>
                
//                 {/* Display error message if any */}
//                 {errorMessage && <div className="error-message">{errorMessage}</div>}
                
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="submit-btn" disabled={isLoading}>
//                         {isLoading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>

//                 <div className="signup-link">
//                     <p>Don't have an account? <a href="/signup">Sign up</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
