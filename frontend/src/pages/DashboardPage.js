import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/api/devices')
            .then((response) => response.json())
            .then((data) => setDevices(data))
            .catch((error) => console.error('Error fetching devices:', error));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {devices.map((device) => (
                    <li key={device.id}>
                        {device.name} - {device.status ? 'On' : 'Off'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;
