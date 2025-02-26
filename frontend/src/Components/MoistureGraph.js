import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MoistureGraph = () => {
  const [moistureData, setMoistureData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMoisture = Math.floor(Math.random() * 100); // Dummy API data
      setMoistureData((prev) => [
        ...prev.slice(-4),
        { time: new Date().toLocaleTimeString(), value: newMoisture },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: moistureData.map((d) => d.time),
    datasets: [
      {
        label: "Moisture Level",
        data: moistureData.map((d) => d.value),
        borderColor: "blue",
        tension: 0.4,
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Moisture Trend</Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default MoistureGraph;
