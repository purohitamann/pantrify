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
import { query, collection, getDocs } from "firebase/firestore";
import { get } from "http";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState<{ name: string }[]>([]); // Update the type of inventory state
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: { name: string }[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(inventoryList);
    setInventory(inventoryList);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeItem = async (itemName: string) => {
    const docRef = doc(collection(firestore, "inventory"), itemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const quantity = docSnap.data().quantity;
      if (quantity > 0) {
        await updateDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
    }
    updateInventory();
  };
  const addItem = async (itemName: string) => {
    const docRef = doc(collection(firestore, "inventory"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const quantity = docSnap.data();
      await updateDoc(docRef, { quantity: quantity.quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    updateInventory();
  };

  useEffect(() => {
    updateInventory();
    console.log(inventory);
  }, []);

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
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="400px"
          bgcolor="white"
          sx={{ transform: "translate(-50%, -50%)" }}
          boxShadow={24}
          border={"1px solid black"}
          p={4}
          borderRadius={2}
          display="flex"
          flexDirection={"column"}
          gap={3}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack direction="row" gap={2} flexDirection={"row"}>
            <TextField
              value={itemName}
              fullWidth
              onChange={(e) =>
                e.target.value != ""
                  ? setItemName(e.target.value)
                  : setItemName("")
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                if (itemName !== "") {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Welcome to Pantrify</Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Item
      </Button>
    </Box>
  );
}
