import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [lastImages, setLastImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempImage(imageURL);
    }
  };

  const handleConfirmUpload = async () => {
    if (tempImage) {
      setLoading(true);
      setResponseMessage("");
      const token = localStorage.getItem("access_token");
      const id = localStorage.getItem("id");
      
      const formData = new FormData();
      formData.append("image", tempImage);
      formData.append("id", id);

      try {
        const response = await fetch("/detect_plant_disease", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        setResponseMessage(data.message || "Disease detection completed.");
        setSelectedImage(tempImage);
        setLastImages((prev) => [tempImage, ...prev.slice(0, 4)]);
      } catch (error) {
        setResponseMessage("Error detecting disease. Try again.");
      } finally {
        setTempImage(null);
        setLoading(false);
      }
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
              <Button variant="contained" color="primary" onClick={handleConfirmUpload} disabled={loading}>
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
