import React from 'react'
import Sidenav from './Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../Components/Navbar';

export default function Setting() {
  return (
    <>

<Navbar/>
<Box height={30} />

    <Box sx={{ display: 'flex' }}>
    <Sidenav />
    

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h1>Settings</h1>
        <Typography paragraph>
          hello1
        </Typography>
        <Typography paragraph>
          hello1
        </Typography>
      </Box>


    </Box>

    </>
  );
}

