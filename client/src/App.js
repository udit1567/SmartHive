import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    // Fetch the data from Flask backend
    fetch('https://0.0.0.0:10000/get_data?device_id=1') // Replace with your Flask server's IP if not on the same machine
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
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Temperature</th>
              <th scope='col'>Humidity</th>
              <th scope='col'>Timestamp</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((record, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{record.temperature}</td>
                <td>{record.humidity}</td>
                <td>{record.timestamp}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </header>
    </div>
  );
}

export default App;
