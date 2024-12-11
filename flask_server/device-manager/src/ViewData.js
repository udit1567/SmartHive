import React, { useState } from "react";
import axios from "axios";

function ViewData() {
    const [deviceId, setDeviceId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get("/get_data", {
                params: { device_id: deviceId },
            });
            setData(response.data);
            setError("");
        } catch (error) {
            setError(error.response?.data?.error || "Error fetching data");
        }
    };

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h2 className="text-center text-success mb-4">View Device Data</h2>
            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                />
            </div>
            <button className="btn btn-success w-100" onClick={fetchData}>
                Fetch Data
            </button>
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
            {data && (
                <div className="mt-4">
                    <h3 className="text-secondary">Device Name: {data.device_name}</h3>
                    <ul className="list-group mt-3">
                        {data.data.map((d, index) => (
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                                key={index}
                            >
                                <span>
                                    Temp: <b>{d.temperature}°C</b>, Humidity:{" "}
                                    <b>{d.humidity}%</b>
                                </span>
                                <span className="badge bg-primary">
                                    {new Date(d.timestamp).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ViewData;
