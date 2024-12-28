import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // To get the email from URL
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import Sidenav from "../Dashboard/Sidenav";

const ProfilePage = () => {
    const { email } = useParams();  // Get the email from the URL parameter
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");  // Get the auth token
        const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));  // Get the user info from localStorage

        if (token && storedUserInfo) {
            setUserData(storedUserInfo);
        } else {
            // Handle if no user info or token exists
            console.error("No user information or token found");
        }
    }, [email]);  // Run when the email in the URL changes

    return (
        <>
        <Sidenav/>
        <Box sx={{ padding: 3 }}>
            {userData ? (
                <Card>
                    <CardContent>
                        <Typography variant="h5">User Profile</Typography>
                        <Typography variant="body1">Name: {userData.name}</Typography>
                        <Typography variant="body1">Email: {userData.email}</Typography>
                        <Typography variant="body1">ID: {userData.id}</Typography>
                        <Typography variant="body1">Auth Token: {userData["auth-token"]}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Edit Profile</Button>
                        <Button size="small">Log Out</Button>
                    </CardActions>
                </Card>
            ) : (
                <Typography variant="body1">Loading...</Typography>
            )}
        </Box>
        </>
    );
};

export default ProfilePage;
