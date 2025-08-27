import React from "react";
import { Box, Grid, Container } from "@mui/material";
import ImageUpload from "./ImageUpload";
import MoistureCard from "./MoistureCard";
import MoistureGraph from "./MoistureGraph";
import Sidenav from "../Dashboard/Sidenav";
import PreviewImage from "./PreviewImage";

const PlantMonitoring = () => {
  return (
    <>
      <Box height={100} />

      {/* Layout wrapper */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <Sidenav />
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              {/* Top Moisture Indicator */}
              <Grid item xs={12} md={4} lg={3}>
                <MoistureCard />
              </Grid>

              {/* Moisture Graph */}
              <Grid item xs={12} md={8} lg={9}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <MoistureGraph />
                </Box>
              </Grid>

              {/* Image Upload Component */}
              <Grid item xs={12} md={6}>
                <ImageUpload />
              </Grid>

              {/* Printing previous images */}
              <Grid item xs={12} md={6}>
                <PreviewImage apiUrl="http://127.0.0.1:5000/fetch_plant_disease_images" />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PlantMonitoring;
