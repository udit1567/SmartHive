import React from "react";
import Sidenav from "./Sidenav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function Home() {
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
                    >
                      Current Temperature here
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      justifyContent: "center",
                      mt: "auto",
                      pb: 2,
                    }}
                  >
                    <Button size="small" sx={{ mx: 1 }}>
                      Refresh
                    </Button>
                    <Button size="small" sx={{ mx: 1 }}>
                      Help
                    </Button>
                  </CardActions>
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
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      Humidity here
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Refresh</Button>
                    <Button size="small">Help</Button>
                  </CardActions>
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
                      Authorization Token
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      Authenticate the device
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Auth</Button>
                    <Button size="small">Help</Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: "60vh", width: "100%" }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
                  >
                    Temperature over the time
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                    }}
                  >
                    Graph
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
