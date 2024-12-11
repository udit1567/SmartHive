import React, { useState } from "react";
import axios from "axios";

function RegisterDevice() {
    const [deviceName, setDeviceName] = useState("");
    const [message, setMessage] = useState("");

    const registerDevice = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("/register_device", {
                params: {
                    "API-Key": "5588",
                    device_name: deviceName,
                },
            });
            setMessage({ type: "success", text: response.data.message });
        } catch (error) {
            setMessage({
                type: "danger",
                text: error.response?.data?.error || "Error registering device",
            });
        }
    };

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h2 className="text-center text-primary mb-4">Register New Device</h2>
            <form onSubmit={registerDevice}>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Device Name"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
            {message && (
                <div className={`alert alert-${message.type} mt-4`} role="alert">
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default RegisterDevice;
