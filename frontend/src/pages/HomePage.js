import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title hh1">Welcome to SmartHive</h1>
                    <p className="hero-subtitle">
                        Connect, control, and monitor your devices effortlessly.
                    </p>
                    <Link to="/login">
                        <button className="hero-button">Get Started</button>
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="features-title">Why Choose Build.io?</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <h3>Real-Time Monitoring</h3>
                        <p>Monitor your devices in real-time with interactive dashboards.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Secure Control</h3>
                        <p>Manage your IoT devices with robust security features.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Easy Integration</h3>
                        <p>Seamlessly connect devices with intuitive setup processes.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Build.io. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
