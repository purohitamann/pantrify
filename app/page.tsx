"use client";
import Image from "next/image";
import {
  Box,
  Modal,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import Dashboard from "../components/Dashboard";
import AuthComponent from "../components/AuthComponent";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
    >
      <AuthComponent />
      {session ? (
        <>

          <Typography>{JSON.stringify(session)}</Typography>

          <Dashboard />
          <AuthComponent />
        </>
      ) : (
        <>

          <AuthComponent />
          <Typography>Not Signed In</Typography>
        </>
      )}



    </Box>
  );
}
