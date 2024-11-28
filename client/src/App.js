import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    // Fetch the data from Flask backend
    fetch('http://127.0.0.1:5000/get_data?device_id=1') // Replace with your Flask server's IP if not on the same machine
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Debugging
        setDeviceName(data.device_name);
        setData(data.data); // Assuming the response includes `device_name` and `data` as in the Flask route
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Device Data Viewer</h1>
        <p>Connected Device: {deviceName}</p>
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                <td>{record.temperature}</td>
                <td>{record.humidity}</td>
                <td>{record.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
