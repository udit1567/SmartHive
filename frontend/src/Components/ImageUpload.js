import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempImage, setTempImage] = useState(null); // Stores selected image before confirmation
  const [lastImages, setLastImages] = useState([]); // Stores last 5 uploaded images

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempImage(imageURL); // Store temporary preview
    }
  };

  const handleConfirmUpload = () => {
    if (tempImage) {
      setSelectedImage(tempImage); // Move temp image to final preview
      setLastImages((prev) => [tempImage, ...prev.slice(0, 4)]); // Keep last 5 images

      // 🔹 API Call (Replace this with actual API logic)
      console.log("Image sent to API:", tempImage);

      setTempImage(null); // Reset temp image after confirmation
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

        {/* Temporary Image Preview + Confirm Button */}
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
              <Button variant="contained" color="primary" onClick={handleConfirmUpload}>
                Confirm Upload
              </Button>
            </Box>
          </Box>
        )}

        {/* Current Image Preview After Confirmation */}
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

        {/* Last 5 Uploaded Images */}
        <Box mt={2}>
          <Typography variant="subtitle2">Previous Images</Typography>
          <Box display="flex" gap={1}>
            {lastImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Prev-${idx}`}
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
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
