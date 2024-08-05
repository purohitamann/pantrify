'use client';
import React from 'react';
import { useState } from 'react';
import { createUser, signUp } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { Stack } from '@mui/material';
import Image from 'next/image';
import Tooltip from '@mui/joy/Tooltip';

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSignUp = async () => {
        if (password == retypePassword) {
            try {
                await signUp(email, password);
                router.push('/dashboard');
            } catch (error) {
                console.error('Failed to sign up:', error);
            }
        }

    };
    const handleSignIn = async () => {
        try {

            router.push('/signin');
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    }
    return (
        <div>

            <Box component="section" color="primary" sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', bgcolor: 'primary.050' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image src="/Pantrify-bg.png" alt="pantrify logo" width={450} height={150} />
                    <Typography level="title-lg" sx={{ mb: 0.5 }} color='primary' >
                        Sign Up
                    </Typography>
                </Box>
                <Box sx={{ border: '1px dashed grey', p: 2, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 'lg' }}>
                    <Input
                        color="primary"
                        placeholder="Email"
                        variant="soft"
                        value={email}
                        type="email"
                        sx={{ width: '300px' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        color="primary"
                        variant="soft"
                        sx={{ width: '300px' }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        color="primary"
                        variant="soft"
                        sx={{ width: '300px' }}
                        type="password"
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                    <Button sx={{ width: '300px' }} onClick={handleSignUp}>Sign Up</Button>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography maxWidth={300} sx={{ fontSize: 'sm' }}>
                        Already have an account?
                    </Typography>
                    <Typography maxWidth={300} sx={{ fontSize: 'sm' }}>
                        <Tooltip title="click here to sign in" variant="outlined">
                            <Typography variant="soft" color="primary" onClick={handleSignIn}>
                                Sign In
                            </Typography></Tooltip>

                        <Typography >
                            {'  '} to continue.
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
