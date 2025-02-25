import React, { useState, useEffect } from "react";
import { Drawer, IconButton, Slider, Typography, Switch, Box, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AcUnit, Lightbulb, Toys, VolumeUp } from "@mui/icons-material";
import WindPowerSharpIcon from '@mui/icons-material/WindPowerSharp';
import Sidenav from "../Dashboard/Sidenav";

const esp32IP = "192.168.43.175";  // Change this to your ESP32's IP address

const ACControlPanel = ({ open, onClose }) => {
  const [isOn, setIsOn] = useState(false);
  const [temperature, setTemperature] = useState(24);

  const handlePowerToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width={300}>
        <Typography variant="h6">AC Control</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography>Power</Typography>
          <Switch checked={isOn} onChange={handlePowerToggle} color="primary" />
        </Box>
        <Box mt={3}>
          <Typography gutterBottom>Temperature ({temperature}°C)</Typography>
          <Slider
            value={temperature}
            onChange={(e, val) => setTemperature(val)}
            min={16}
            max={30}
            step={1}
            valueLabelDisplay="auto"
            disabled={!isOn}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" disabled={!isOn} onClick={() => setTemperature((prev) => Math.max(prev - 1, 16))}>
            -1°C
          </Button>
          <Button variant="contained" disabled={!isOn} onClick={() => setTemperature((prev) => Math.min(prev + 1, 30))}>
            +1°C
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

const LightControlPanel = ({ open, onClose }) => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(50);

  // Function to check relay state from ESP32
  const checkRelayState = async () => {
    try {
      const response = await fetch(`http://${esp32IP}/relay/state`);
      const data = await response.json();
      setIsOn(data.status === "ON"); // Ensure UI reflects actual relay state
    } catch (error) {
      console.error("Error fetching relay state:", error);
    }
  };

  // Function to toggle relay power
  const handleTogglePower = async () => {
    const newState = !isOn;
    const endpoint = newState ? "/relay/ON" : "/relay/OFF";

    try {
      await fetch(`http://${esp32IP}${endpoint}`);
      setTimeout(checkRelayState, 1000); // Wait 1 sec then check state
    } catch (error) {
      console.error("Error toggling relay:", error);
      alert("Failed to toggle relay. Check your connection.");
    }
  };

  // Sync UI with relay state on component mount
  useEffect(() => {
    checkRelayState();
  }, []);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width={300}>
        <Typography variant="h6">Lights Control</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography>Power</Typography>
          <Switch checked={isOn} onChange={handleTogglePower} color="primary" />
        </Box>
        <Box mt={3}>
          <Typography gutterBottom>Brightness</Typography>
          <Slider
            value={brightness}
            onChange={(e, val) => setBrightness(val)}
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
            disabled={!isOn}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

const FanControlPanel = ({ open, onClose }) => {
  const [isOn, setIsOn] = useState(false);
  const [speed, setSpeed] = useState(3);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width={300}>
        <Typography variant="h6">Fan Control</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Typography>Power</Typography>
          <Switch checked={isOn} onChange={() => setIsOn(!isOn)} color="primary" />
        </Box>
        <Box mt={3}>
          <Typography gutterBottom>Speed</Typography>
          <Slider
            value={speed}
            onChange={(e, val) => setSpeed(val)}
            min={1}
            max={5}
            step={1}
            valueLabelDisplay="auto"
            disabled={!isOn}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

const DomoticAssistant = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const openControlPanel = (device) => {
    setSelectedDevice(device);
  };

  const closeControlPanel = () => {
    setSelectedDevice(null);
  };

  return (
    <>
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box p={3}>
          <Typography variant="h4">Domotic Assistant</Typography>
          <Box mt={3} display="flex">
            <Box width={250}>
              <Typography variant="h6">Devices</Typography>
              <List>
                <ListItem button onClick={() => openControlPanel("Lights")}>
                  <ListItemIcon><Lightbulb /></ListItemIcon>
                  <ListItemText primary="Lights" />
                </ListItem>
                <ListItem button onClick={() => openControlPanel("Fans")}>
                  <ListItemIcon><WindPowerSharpIcon /></ListItemIcon>
                  <ListItemText primary="Fans" />
                </ListItem>
                <ListItem button onClick={() => openControlPanel("AC")}>
                  <ListItemIcon><AcUnit /></ListItemIcon>
                  <ListItemText primary="Air Conditioning" />
                </ListItem>
                <ListItem button onClick={() => openControlPanel("Speakers")}>
                  <ListItemIcon><VolumeUp /></ListItemIcon>
                  <ListItemText primary="Speakers" />
                </ListItem>
              </List>
            </Box>
          </Box>
          {selectedDevice === "AC" && <ACControlPanel open={true} onClose={closeControlPanel} />}
          {selectedDevice === "Lights" && <LightControlPanel open={true} onClose={closeControlPanel} />}
          {selectedDevice === "Fans" && <FanControlPanel open={true} onClose={closeControlPanel} />}
        </Box>
      </Box>
    </>
  );
};

export default DomoticAssistant;
