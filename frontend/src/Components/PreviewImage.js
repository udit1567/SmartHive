import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close as CloseIcon } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PreviewImage = ({ apiUrl }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setImages(data.plant_disease_images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiUrl]);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
        <Typography>Loading images...</Typography>
      </Box>
    );
  }

  if (!images.length) {
    return <Typography textAlign="center">No images available</Typography>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <IconButton sx={{ position: "absolute", left: 0, zIndex: 1 }}>
        <ArrowBackIos />
      </IconButton>
    ),
    nextArrow: (
      <IconButton sx={{ position: "absolute", right: 0, zIndex: 1 }}>
        <ArrowForwardIos />
      </IconButton>
    ),
  };

  return (
    <Box
      sx={{
        maxWidth: 300,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Image Carousel */}
      <Slider {...settings}>
        {images.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Plant Disease ${idx}`}
            sx={{ width: "100%", height: 200, objectFit: "cover", cursor: "pointer" }}
            onClick={() => {
              setSelectedImage(img);
              setOpen(true);
            }}
          />
        ))}
      </Slider>

      {/* Fullscreen Image Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Enlarged View"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PreviewImage;
