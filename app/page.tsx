'use client';

import * as React from 'react';
import { Box, Typography, Button, Container } from '@mui/joy';
import Link from '@mui/joy/Link';
import Image from 'next/image';
import NavigationBar from '../components/NavbarComponent/index';

export default function LandingPage() {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
          bgcolor: 'primary.050',
        }}
      >
        <Container>
          <Box >
            {/* <Typography level="h1" sx={{ mb: 2, }} color='primary'>
              Welcome to Pantrify
            </Typography> */}
            <Box sx={{ mb: 4 }}>
              <Image src="/Pantrify-bg.png" alt="Pantry Image" width={650} height={280} />
            </Box>

            <Typography level="body-sm" >
              Pantrify is an innovative web app that helps you manage your pantry efficiently by tracking your items and providing a user-friendly interface for daily inventory management.
            </Typography>
            <Typography level="body-sm" sx={{ mb: 4 }}>
              As a beta feature, you can soon click a picture of your items to add them to your personal pantry tracker, making it easier than ever to keep track of what you have.
            </Typography>

            <Box>
              <Button variant="solid" component={Link} href="/signup" sx={{ mr: 2 }}>
                Get Started
              </Button>
              <Button variant="outlined" component={Link} href="/signin">
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
