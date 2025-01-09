import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  TableHead,
} from "@mui/material";
import Sidenav from "../Dashboard/Sidenav"; // Import Sidenav or replace with actual component

const AdminPanel = () => {
  return (
    <>
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Panel
          </Typography>
          <Box height={40} />

          {/* User Activity Log Section */}
          <Section title="User Activity Log">
            <Typography variant="body1">
              View detailed activity logs for all users:
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Timeline</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ActivityLogTable userEmail="user1@example.com" initialStatus="active" />
                  <ActivityLogTable userEmail="user2@example.com" initialStatus="blocked" />   
                  {/* blocked/active */}
                </TableBody>
              </Table>
            </TableContainer>
          </Section>

          {/* Data Visualization */}
          <Section title="Data Visualization">
            <Typography variant="body1">Real-time data updates:</Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Typography variant="body2">Graph Placeholder</Typography>
            </Box>
          </Section>

          {/* Account Management */}
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

const ActivityLogTable = ({ userEmail, initialStatus }) => {
  const [isBlocked, setIsBlocked] = useState(initialStatus === "blocked");
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(isBlocked ? "unblock" : "block");

  const handleButtonClick = () => {
    setAction(isBlocked ? "unblock" : "block"); // Toggle action
    setOpenDialog(true);
  };

  const handleConfirmAction = async () => {
    try {
      const endpoint = isBlocked
        ? `/api/blockUser/${userEmail}`
        : `/api/unblockUser/${userEmail}`; // Call the corresponding endpoint

      const response = await fetch(endpoint, { method: "POST" });

      if (response.ok) {
        setIsBlocked(!isBlocked); // Toggle the blocked status
      } else {
        console.error("Failed to update user status.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setOpenDialog(false); // Close the dialog
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{userEmail}</TableCell>
        <TableCell>{isBlocked ? "Blocked" : "Active"}</TableCell>
        {/* <TableCell>{new Date().toLocaleString()}</TableCell> */}
        <TableCell>CHECK CHECK</TableCell>
        <TableCell align="center">

          <Button
            variant="contained"
            style={{
              backgroundColor: isBlocked ? "green" : "red", // Toggle button color based on status
              color: "white",
            }}
            onClick={handleButtonClick}
          >
            {isBlocked ? "Unblock" : "Block"} {/* Toggle button text */}
          </Button>
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Do you want to {action} this user?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={action === "block" ? "success" : "error"} // Color based on action
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminPanel;
