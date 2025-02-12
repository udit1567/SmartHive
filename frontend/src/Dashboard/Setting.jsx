import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Sidenav from "./Sidenav";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const InputPage = () => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState(""); // For email change
  const [authToken, setAuthToken] = useState("ABC123XYZ");
  const [address, setAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordForPasswordChange, setCurrentPasswordForPasswordChange] = useState(""); // For password change
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);



  const handleCopyToken = () => {
    navigator.clipboard.writeText(authToken)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleSaveEmail = () => {
    if (currentPasswordForEmail !== "userCurrentPassword") {
      setDialogMessage("Invalid current password. Please try again.");
      setOpenDialog(true);
      return;
    }
    console.log("Email changed to:", newEmail);
  };

  const handleSavePassword = () => {
    if (newPassword && currentPasswordForPasswordChange) {
      console.log("Password changed");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box sx={{ p: 4 }}>
          <Box height={40} />
          <Typography variant="h4" component="h1" gutterBottom>
            Settings
          </Typography>

          {/* New Email and Current Password for validation */}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12} sm={6  }>
              <TextField
                label="New Email"
                variant="outlined"
                fullWidth
                size="small"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                size="small"
                type="password"
                value={currentPasswordForEmail}
                onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEmail}
            sx={{
              mt:"0.5%",
              width: { xs: "100%", sm: "auto" },
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Save Email
          </Button>

          {/* Authentication Token */}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Authentication Token"
                variant="outlined"
                fullWidth
                value={authToken}
                disabled
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="outlined"
                onClick={handleCopyToken}
                startIcon={<ContentCopyIcon />}
                sx={{
                  margin: "2%",
                  width: "100%",
                  padding: "8px 52px",
                  fontSize: "14px",
                }}
              >
                Copy
              </Button>
            </Grid>
          </Grid>

          {/* Address Field */}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("Address saved")}
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "auto" },
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Save Address
          </Button>

          {/* Change Password */}
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                type="password"
                value={currentPasswordForPasswordChange}
                onChange={(e) => setCurrentPasswordForPasswordChange(e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePassword}
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "auto" },
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Save Password
          </Button>

          {/* Dialog for confirmation */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Validation Error</DialogTitle>
            <DialogContent>
              <Typography color="error">{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default InputPage;
