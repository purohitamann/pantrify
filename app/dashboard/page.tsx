'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from "firebase/auth";
import DashbordComponent from '../../components/DashboardComponent/index';
export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null); // Update the type of user to User | null
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/signin');
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.email}</p>
            <DashbordComponent />
        </div>
    );
}
