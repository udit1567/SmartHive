import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box } from "@mui/material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
const MoistureCard = () => {
  const [moisture, setMoisture] = useState(null);
  const token = localStorage.getItem("access_token");
  const id = localStorage.getItem("id");

  // Fetch soil moisture data
  const fetchMoistureData = () => {
    if (token && id) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/get_d1/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          const data = response.data.D1; // Extracting 'D3' from API response
          console.log("Moisture Data:", data);
          setMoisture(data);
        })
        .catch((error) => {
          console.error("Moisture API error:", error);
        });
    }
  };

  // Auto-update every 15 sec
  useEffect(() => {
    fetchMoistureData();
    const interval = setInterval(fetchMoistureData, 15000);
    return () => clearInterval(interval);
  }, [token, id]);

  // Color gradient based on moisture level
  const getMoistureColor = () => {
    if (moisture === null) return "gray"; // Default color if data is not available
    if (moisture < 30) return "linear-gradient(to right,rgb(110, 77, 255),rgb(26, 247, 255))"; // Dry (Red)
    if (moisture > 70) return "linear-gradient(to right, #4caf50, #2e7d32)"; // Well-Watered (Green)
    return "linear-gradient(to right, #ffa726, #ff9800)"; // Medium (Orange)
  };

  return (
    <Card sx={{ background: getMoistureColor(), color: "white" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <DeviceThermostatIcon fontSize="large" />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Temperature
          </Typography>
        </Box>
        <Typography variant="h3">
          {moisture !== null ? `${moisture} C` : "Loading..."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MoistureCard;