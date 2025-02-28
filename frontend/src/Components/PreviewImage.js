import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, IconButton, Modal } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PreviewImage = ({ apiUrl }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    if (!authToken) {
      console.error("Auth token not found!");
      return;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.plant_disease_images) {
          setImages(data.plant_disease_images.reverse()); // Reverse the order of images
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [apiUrl]);

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const prevImage = () => {
    const newIndex = (currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = (currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true, // Reverse the carousel direction
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Plant Disease Images
      </Typography>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((imgSrc, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                }}
                onClick={() => openImage(index)}
              >
                <CardMedia
                  component="img"
                  image={imgSrc}
                  alt={`Plant Disease ${index}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography>No images found.</Typography>
      )}

      {/* Pop-up Modal for Enlarged Image */}
      <Modal open={!!selectedImage} onClose={closeImage}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            p: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={prevImage}
            sx={{
              position: "absolute",
              left: 10,
              color: "white",
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <Box sx={{ maxWidth: "80%", maxHeight: "80%" }}>
            <CardMedia
              component="img"
              image={selectedImage}
              alt="Enlarged Plant Disease Image"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                borderRadius: 2,
                objectFit: "contain",
              }}
            />
          </Box>
          <IconButton
            onClick={nextImage}
            sx={{
              position: "absolute",
              right: 10,
              color: "white",
            }}
          >
            <ArrowForwardIos />
          </IconButton>
          <IconButton
            onClick={closeImage}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviewImage;