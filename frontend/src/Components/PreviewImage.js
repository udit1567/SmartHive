import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";

const PreviewImage = ({ apiUrl }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Retrieve API token from localStorage
    const authToken = localStorage.getItem("auth");
    console.log("Auth token:", authToken);

    if (!authToken) {
      console.error("Auth token not found!");
      return;
    }

    // Fetch API with correct headers (without 'Bearer')
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken, // Corrected: Sending token directly
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.plant_disease_images) {
          setImages(data.plant_disease_images);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [apiUrl]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Plant Disease Images
      </Typography>
      <Grid container spacing={2}>
        {images.length > 0 ? (
          images.map((imgSrc, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia component="img" image={imgSrc} alt={`Plant Disease ${index}`} />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No images found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default PreviewImage;
