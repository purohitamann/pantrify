'use client';
import React from 'react';
import { useState } from 'react';
import { createUser, signUp } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await signUp(email, password);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to sign up:', error);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}
