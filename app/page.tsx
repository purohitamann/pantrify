import React from "react";
import { Box, Button, Typography, Stack, AppBar, Toolbar, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
// replace with your image path
const LandingPage = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantrify
          </Typography>
          <Button color="inherit" component={Link} href="/signin">
            Sign In
          </Button>
          <Button color="inherit" component={Link} href="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
          minHeight="70vh"
          gap={3}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Pantrify
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Manage your daily pantry effortlessly.
          </Typography>
          <Box width="100%" maxWidth={600} borderColor={"red"}>
            {/* <Image src={heroImage} alt="Pantry Image" layout="responsive" /> */}
            {/* <img src="/hero-image.jpg" alt="Pantry Image" /> */}
          </Box>
          <Typography variant="body1" component="p" gutterBottom>
            Soon, you'll be able to add items by clicking a photo of them and get recipe suggestions based on the items available.
          </Typography>
          <Stack direction="row" gap={2}>
            <Button variant="contained" size="large" component={Link} href="/signup">
              Get Started
            </Button>
            <Button variant="outlined" size="large" component={Link} href="/signin">
              Sign In
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
