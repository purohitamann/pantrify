'use client';
import React from 'react'
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
const SessionWrapper = ({ children }: { children: React.ReactNode }) => {


    return <><SessionProvider>{children}</SessionProvider></>

    //     <p>Unauthorized</p>
    //     <Link href="/">Login</Link>
    // </>
}

export default SessionWrapper;
