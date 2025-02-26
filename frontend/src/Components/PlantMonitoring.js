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
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        {/* Adjust spacing for navbar & sidenav */}

        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* Top Moisture Indicator */}
            <Grid item xs={12} md={6} lg={2.5}>
              <MoistureCard />
            </Grid>

            {/* Moisture Graph please no errors*/}
            <Grid item xs={12} md={6} lg={7}>
              <MoistureGraph />
            </Grid>

            {/* Image Upload Component */}
            <Grid item xs={12} md={6} lg={6}>
              <ImageUpload />
            </Grid>

            {/*Printing previous images*/}
            <Grid item xs={12} md={6} lg={4}>
              <PreviewImage apiUrl="http://127.0.0.1:5000/fetch_plant_disease_images" />
            </Grid>

            
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PlantMonitoring;
