import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Home() {
  const [profileData, setProfileData] = useState(null);
  const [tempHumidityData, setTempHumidityData] = useState([]);
  const email = JSON.parse(localStorage.getItem("email"));
  const token = localStorage.getItem("access_token");
  const id = localStorage.getItem("id");

  const fetchData = () => {
    if (token && id) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/get_data/${id}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          const data = response.data.data.filter((entry) => entry.D3 !== null);
          setTempHumidityData(data);
        })
        .catch((error) => console.error("Temperature/Humidity API error:", error));
    }
  };

  useEffect(() => {
    if (token && id) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/profile/${email}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          const res = response.data;
          if (res.access_token) {
            localStorage.setItem("access_token", res.access_token);
          }
          setProfileData({
            profile_name: res.name,
            profile_email: res.email,
            token: res.token,
          });
        })
        .catch((error) => console.error("Profile API error:", error));
    }
    
    fetchData();
    const interval = setInterval(fetchData, 20000); // Fetch every 20 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [token, email, id]);

  const data = {
    labels: tempHumidityData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Soil Moisture",
        data: tempHumidityData.map((d) => Math.max(0, Math.min(100, d.D3))),
        borderColor: "orange",
        tension: 0.4,
        pointRadius: 2,
        pointBackgroundColor: "orange",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: "Time" },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        title: { display: true, text: "Moisture Level" },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      zoom: {   
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  return (
    <Card style={{ width: "100%", height: "400px" }}>
      <CardContent>
        <Typography variant="h6"> Moisture Trend</Typography> {/*D3*/} 
        <div style={{ width: "100%", height: "90%", overflowX: "auto" }}>
          <Line data={data} options={options} style={{ width: "100%", height: "330px" }} />
        </div>
      </CardContent>
    </Card>
  );
}