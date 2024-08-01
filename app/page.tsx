'use client';
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import { firestore } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { get } from "http";

export default function Home() {
  const [inventory, setInventory] = useState<{ name: string; }[]>([]); // Update the type of inventory state
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList: { name: string; }[] = []; // Update the type of inventoryList
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    })
    setInventory(inventoryList);
  }

  return (
    <Box><Typography variant="h1">Hello World </Typography></Box>
  );
}
