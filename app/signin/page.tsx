'use client';
import React from 'react';
import { useState } from 'react';
import { loginUser } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Stack } from '@mui/material';
import Image from 'next/image';
import Tooltip from '@mui/joy/Tooltip';
export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await loginUser(email, password);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };
    const handleSignUp = async () => {
        try {
            router.push('/signup');
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };

    return (
        <Box component="section" color="primary" sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', bgcolor: 'primary.050' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src="/Pantrify-bg.png" alt="pantrify logo" width={450} height={150} />
                <Typography level="title-lg" sx={{ mb: 0.5 }} color='primary' >
                    Sign In
                </Typography>
            </Box>
            <Box sx={{ border: '1px dashed grey', p: 2, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 'lg' }}>
                <Input
                    color="primary"
                    placeholder="Email"
                    variant="soft"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    sx={{ width: '300px' }}
                />
                <Input
                    color="primary"
                    placeholder="Password"
                    variant="soft"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    sx={{ width: '300px' }}
                />
                <Button sx={{ width: '300px' }} onClick={handleSignIn}>Sign In</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography maxWidth={300} sx={{ fontSize: 'sm' }}>
                    Don't have an account?
                </Typography>
                <Typography maxWidth={300} sx={{ fontSize: 'sm' }}>
                    <Tooltip title="click here to sign up" variant="outlined">
                        <Typography variant="soft" color="primary" onClick={handleSignUp}>
                            Sign Up
                        </Typography></Tooltip>

                    <Typography >
                        {'  '} to create an account.
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
