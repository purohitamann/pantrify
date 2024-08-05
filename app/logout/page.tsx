'use client';

import { useEffect } from 'react';
import { logoutUser } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logoutUser();
                router.push('/signin');
            } catch (error) {
                console.error('Failed to sign out:', error);
            }
        };

        handleLogout();
    }, [router]);

    return <>
        <div>Logging out...</div> </>;
}
