'use client';
import React from 'react';
import { useState } from 'react';
import { loginUser } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

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

    return (
        <div>
            <h1>Sign In</h1>
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
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}
