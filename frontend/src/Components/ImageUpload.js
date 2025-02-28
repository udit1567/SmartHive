import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [lastImages, setLastImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState(null); // Store selected file for upload

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const imageURL = URL.createObjectURL(uploadedFile);
      setTempImage(imageURL);
      setFile(uploadedFile); // Store actual file for upload
    }
  };

  const handleConfirmUpload = async () => {  
    if (!file) {
      setResponseMessage("No image selected.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const token = localStorage.getItem("auth");
    const id = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("image", file); 
    formData.append("id", id);

    try {
      const response = await fetch("http://127.0.0.1:5000/detect_plant_disease", {
        method: "POST",
        headers: {
          Authorization: token, // âœ… Send token without 'Bearer'
        },
        body: formData,
      });

      const data = await response.json();
      setResponseMessage(data.message || "Disease detection completed.");
      setSelectedImage(tempImage);
      setLastImages((prev) => [tempImage, ...prev.slice(0, 4)]);

      // âœ… Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 500); 

    } catch (error) {
      setResponseMessage("Error detecting disease. Try again.");
    } finally {
      setTempImage(null);
      setFile(null); 
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Upload Plant Image</Typography>
        <Box
          sx={{
            border: "2px dashed #ccc",
            textAlign: "center",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <CloudUploadIcon fontSize="large" color="action" />
            <Typography>Drag & Drop or Click to Upload</Typography>
          </label>
        </Box>

        {tempImage && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle2">Confirm Upload</Typography>
            <img
              src={tempImage}
              alt="Preview"
              style={{ width: "100px", height: "100px", cursor: "pointer" }}
              onClick={() => window.open(tempImage)}
            />
            <Box mt={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmUpload}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Confirm Upload"}
              </Button>
            </Box>
          </Box>
        )}

        {selectedImage && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle2">Current Image</Typography>
            <img
              src={selectedImage}
              alt="Current"
              style={{ width: "100px", height: "100px", cursor: "pointer" }}
              onClick={() => window.open(selectedImage)}
            />
          </Box>
        )}

        {responseMessage && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle1" color="primary">{responseMessage}</Typography>
          </Box>
        )}

        <Box mt={2}>
          <Typography variant="subtitle2">Previous Images</Typography>
          <Box display="flex" gap={1}>
            {lastImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Prev-${idx}`}
                style={{ width: "50px", height: "50px", cursor: "pointer", borderRadius: "8px" }}
                onClick={() => window.open(img)}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;