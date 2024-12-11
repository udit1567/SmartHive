import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get("/get_all_devices");
                setDevices(response.data);
            } catch (error) {
                setError("Error fetching devices");
            }
        };
        fetchDevices();
    }, []);

    const handleDelete = async (deviceId) => {
        try {
            await axios.delete(`/delete_device/${deviceId}`);
            setDevices(devices.filter(device => device.id !== deviceId));
        } catch (error) {
            setError("Error deleting device");
        }
    };

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h2 className="text-center text-success mb-4">Admin Dashboard</h2>
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Device Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(device.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
