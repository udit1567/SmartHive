import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop"; // Moisture icon

const MoistureCard = () => {
  const [moisture, setMoisture] = useState(50); // Dummy data

  // Auto-update every 10 sec
  useEffect(() => {
    const interval = setInterval(() => {
      const newMoisture = Math.floor(Math.random() * 100); // Replace with API call
      setMoisture(newMoisture);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Color gradient based on moisture level
  const getMoistureColor = () => {
    if (moisture < 30) return "linear-gradient(to right, #ff4d4d, #ff1a1a)"; // Dry (Red)
    if (moisture > 70) return "linear-gradient(to right, #4caf50, #2e7d32)"; // Well-Watered (Green)
    return "linear-gradient(to right, #ffa726, #ff9800)"; // Medium (Orange)
  };

  return (
    <Card sx={{ background: getMoistureColor(), color: "white" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <WaterDropIcon fontSize="large" />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Plant Moisture Level
          </Typography>
        </Box>
        <Typography variant="h3">{moisture}%</Typography>
      </CardContent>
    </Card>
  );
};

export default MoistureCard;
