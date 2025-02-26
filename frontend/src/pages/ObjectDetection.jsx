import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import Sidenav from "../Dashboard/Sidenav";
import "./ObjectDetection.css"; 

function DropzoneSection({ section, files, setFiles, handleOpenDialog }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prev) => ({
        ...prev,
        [section]: acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        })),
      }));
    },
  });

  const thumbs = files[section]?.map((file) => (
    <Box key={file.name} className="image-preview">
      <img
        src={file.preview}
        alt={file.name}
        className="image-preview"
      />
    </Box>
  ));

  return (
    <>
    <Box sx={{ flex: 1 }}>
      <Box height={60} />

    
    <Box className="dropzone-section">
      <Typography variant="h5" className="heading" gutterBottom>
        {section === "left" ? "Object Detection" : "Plant Disease Detector"}
      </Typography>
      <Typography variant="subtitle1" className="subheading" gutterBottom>
        {section === "left"
          ? "Upload object to detect"
          : "Upload plant image to detect for disease"}
      </Typography>
      <Box {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <Typography>Drag & drop images here, or click to select files</Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{thumbs}</Box>
      {files[section]?.length > 0 && (
        <Button
          onClick={() => handleOpenDialog(section)}
          variant="contained"
          color="primary"
          className="upload-button"
        >
          Upload Images
        </Button>
      )}
      <div>
      <Typography>Uploaded Images:</Typography>
      </div>
    </Box>
    
    </Box>
    </>
  );
}

export default function ImageUploadPage() {
  const [files, setFiles] = useState({ left: [], right: [] });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const uploadImages = async (section) => {
    setLoading(true);
    try {
      const formData = new FormData();
      files[section]?.forEach((file) => formData.append("images", file));
      await axios.post("https://your-api-endpoint.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (section) => {
    setSelectedSection(section);
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirm) => {
    setOpenDialog(false);
    if (confirm) uploadImages(selectedSection);
  };

  return (
    <Box className="page-container">
      <Sidenav className="sidebar" />
      <Box className="main-content">
        {["left", "right"].map((section) => (
          <DropzoneSection
            key={section}
            section={section}
            files={files}
            setFiles={setFiles}
            handleOpenDialog={handleOpenDialog}
          />
        ))}
        {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      </Box>
      <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
        <DialogTitle>Confirm Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to upload the selected image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)}>Cancel</Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}