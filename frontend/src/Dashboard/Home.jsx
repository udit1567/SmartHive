import Sidenav from "./Sidenav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



export default function Home() {
  const [profileData, setProfileData] = useState(null);
  const [tempHumidityData, setTempHumidityData] = useState([]);
  const email = JSON.parse(localStorage.getItem("email"));
  const token = localStorage.getItem("access_token");
  const id = localStorage.getItem("id");
  

  

  console.log("Email from localStorage:", email);

  // Fetch profile and temperature/humidity data
  useEffect(() => {
    if (token && id) {
      // Fetch profile data
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/profile/${email}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          const res = response.data;
          console.log("Response from profile API:", res);
          if (res.access_token) {
            localStorage.setItem("access_token", res.access_token);
          }
          setProfileData({
            profile_name: res.name,
            profile_email: res.email,
            token: res.token,
          });
        })
        .catch((error) => {
          console.error("Profile API error:", error);
        });

      // Fetch temperature and humidity data
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/get_data/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          const data = response.data.data; // Access the `data` array
          console.log("Temperature and Humidity Data:", data);
          setTempHumidityData(data); // Save the array to state
        })
        .catch((error) => {
          console.error("Temperature/Humidity API error:", error);
        });
    }

  }, [token, email, id]);

const filteredData = tempHumidityData.filter(entry => entry.D1 !== null && entry.D2 !== null);

const graphData = {
  labels: filteredData.map(entry => entry.timestamp),
  datasets: [
    {
      label: "Temperature (°C)",
      data: filteredData.map(entry => entry.D1),
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      tension: 0.6,
      yAxisID: "y",  // Link to left y-axis
    },
    {
      label: "Humidity (%)",
      data: filteredData.map(entry => entry.D2),
      fill: true,
      backgroundColor: "rgba(0, 153, 255, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      tension: 0.6,
      yAxisID: "y1",  // Link to right y-axis
    },
  ],
};

const graphOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperature and Humidity Over Time",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      title: {
        display: true,
        text: "Temperature (°C)",
      },
      position: "left",
      grid: {
        drawOnChartArea: false, // Prevent grid overlap
      },
    },
    y1: {
      title: {
        display: true,
        text: "Humidity (%)",
      },
      position: "right",
      grid: {
        drawOnChartArea: false, // Prevent grid overlap
      },
    },
  },
};


  return (
    <>
      <Navbar />
      <Box height={30} />

      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={40} />
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  pt: "50%",
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Temperature
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    ></Typography>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Timestamp
                          </th>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Temperature (°C)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {tempHumidityData
                        .filter(entry => entry.D1 !== null) // Filter out entries where D1 is null
                        .map((entry, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.timestamp}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.D1}</td>
                          </tr>
                        ))}
                    </tbody>

                    </table>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  pt: "50%",
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Humidity
                    </Typography>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Timestamp
                          </th>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Humidity (%)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {tempHumidityData
                        .filter(entry => entry.D2 !== null) // Exclude rows where D2 is null
                        .map((entry, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.timestamp}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.D2}</td>
                          </tr>
                        ))}
                    </tbody>
                    </table>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  pt: "50%",
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Authentication key for {profileData ? profileData.profile_email : 'unable to load'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      <h2>{profileData ? profileData.token : 'Loading...'}</h2>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleCopy}>Copy</Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid> */}

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  pt: "50%",
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Air Quality Index
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    ></Typography>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Timestamp
                          </th>
                          <th
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            Air Quality Index
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempHumidityData.map((entry, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {entry.timestamp}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {entry.temperature}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: "75vh", width: "100%" }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                    }}
                  >
                    <div>
                      <div style={{ width: "1100px", height: "600px" }}>
                        <Line data={graphData} options={graphOptions} />
                      </div>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
