'use client';

import * as React from 'react';
// import Link from 'next/link';
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import { Box, Container, Button } from '@mui/joy';

export default function NavigationBar() {
    return (
        <>

            <Box sx={{ bgcolor: 'primary.200', py: 1, boxShadow: 'md' }}>
                <Container>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Breadcrumbs aria-label="breadcrumbs" separator="›">
                            <Link href="/" color="primary">
                                Home
                            </Link>
                            <Link href="/about" color="primary">
                                About
                            </Link>
                            <Link href="/beta" color="primary">
                                Beta
                            </Link>
                        </Breadcrumbs>

                        <Box>
                            <Button variant="outlined" component={Link} href="/signin" sx={{ mr: 2 }}>
                                Sign In
                            </Button>
                            <Button variant="solid" component={Link} href="/signup">
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            {/* <Box sx={{ p: 4 }}>
        <Typography level="h1">Hello, Welcome to Pantrify</Typography>
      </Box> */}
        </>
    );
}
