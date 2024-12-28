import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from "@mui/material";
import Sidenav from "../Dashboard/Sidenav";
// Sample Component Structure
const AdminPanel = () => {
  return (
    <>
      {/* <Box height={30} /> */}
      <Box sx={{ display: "flex" }}>

      <Sidenav />
      <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel
        </Typography>

        {/* Role-Based Actions */}
        <Section title="Role-Based Access Control">
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              Assign roles to users and manage their permissions.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <TextField label="User Email" variant="outlined" size="small" />
              <TextField label="Role" variant="outlined" size="small" />
              <Button variant="contained">Assign Role</Button>
            </Box>
          </Box>
        </Section>

        {/* User Management */}
        <Section title="User Activity Log">
          <Typography variant="body1">
            View detailed activity logs for all users:
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Email</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map activity log data here */}
                <TableRow>
                  <TableCell>user@example.com</TableCell>
                  <TableCell>Logged In</TableCell>
                  <TableCell>2024-12-26 12:34 PM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Section>

        {/* Device Management */}
        <Section title="Device Management">
          <Typography variant="body1">Manage IoT devices:</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField label="Device Name" variant="outlined" size="small" />
            <Button variant="contained">Add Device</Button>
            <Button variant="outlined" color="error">
              Remove Device
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Connected Devices</Typography>
            {/* Render list of devices here */}
          </Box>
        </Section>

        {/* Data Visualization */}
        <Section title="Data Visualization">
          <Typography variant="body1">Real-time data updates:</Typography>
          <Box sx={{ height: 300, mt: 2 }}>
            {/* Add line graph component here */}
            <Typography variant="body2">
              Graph 
            </Typography>
          </Box>
        </Section>

        {/* Automation Templates */}
        <Section title="Automation Templates">
          <Typography variant="body1">
            Create or apply automation rules:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Button variant="outlined">
              Template 1: Set temperature threshold
            </Button>
            <Button variant="outlined">
              Template 2: Notify on abnormal readings
            </Button>
            <Button variant="outlined">
              Template 3: Turn off device after X hours
            </Button>
          </Box>
        </Section>

        {/* Password Reset */}
        <Section title="Account Management">
          <Typography variant="body1">
            Reset admin account passwords:
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField label="Admin Email" variant="outlined" size="small" />
            <Button variant="contained" color="primary">
              Reset Password
            </Button>
          </Box>
        </Section>
      </Box>
      </Box>
    </>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

export default AdminPanel;

/**
 * To Implement Backend:
 * - For role management, create endpoints like `POST /assign-role`.
 * - For activity logs, fetch data from `GET /user-logs`.
 * - Device management needs APIs like `POST /devices` and `DELETE /devices`.
 * - Fetch real-time data using WebSocket or periodic polling from `/data-stream`.
 * - Create automation rules with `POST /automation-templates`.
 * - Password reset handled via `POST /reset-password`.
 */
