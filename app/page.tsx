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
import { increment } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
// function card{name,quantity:(name:string,quantity:number)}) {
function CardCustom({
  name,
  quantity,
  removeItem,
  addItem,
}: {
  name: string;
  quantity: number;
  removeItem: (name: string) => void;
  addItem: (name: string) => void;
}) {
  return (
    <>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          pantry name
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Quantity
          </Typography>
          <Typography variant="body2">{quantity}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={() => addItem(name)}>
          Add Quantity
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => removeItem(name)}
        >
          Remove Item
        </Button>
      </CardActions>
    </>
  );
}
export default function Home() {
  // ... existing code ...
  const [inventory, setInventory] = useState<
    { name: string; quantity: number }[]
  >([]);
  // ... existing code ...// Update the type of inventory state
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: { name: string; quantity: number }[] = [];
    docs.forEach((doc) => {
      const data = doc.data();
      inventoryList.push({ name: doc.id, quantity: data.quantity || 0 });
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
      if (quantity > 1) {
        await updateDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
    }
    updateInventory();
  };
  // const addItem = async (itemName: string) => {
  //   const docRef = doc(collection(firestore, "inventory"));
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const quantity = docSnap.data();
  //     await updateDoc(docRef, { quantity: quantity.quantity + 1 });
  //   } else {
  //     await setDoc(docRef, { quantity: 1 });
  //   }
  //   updateInventory();
  // };
  // const addItem = async (itemName: string) => {
  //   const docRef = doc(collection(firestore, "inventory"), itemName);
  //   await setDoc(docRef, { quantity: 1 }, { merge: true });
  //   updateInventory();
  // };
  const addItem = async (itemName: string) => {
    const docRef = doc(collection(firestore, "inventory"), itemName);
    await setDoc(
      docRef,
      {
        quantity: increment(1),
      },
      { merge: true }
    );
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
      <Box>
        <Box
          width={"850px"}
          height={"100px"}
          border={"1px solid black"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h3" textTransform={"uppercase"}>
            Inventory
          </Typography>
        </Box>
      </Box>
      <Stack
        width={"850px"}
        height={"auto"}
        flexWrap={"wrap"}
        direction={"row"}
        gap={2}
        overflow={"auto"}
        p={1}
      >
        {inventory.map((item: { name: string; quantity: number }) => (
          <Stack direction={"row"} key={item.name}>
            <Card sx={{ height: "200px" }} variant="outlined">
              <CardCustom
                name={item.name}
                quantity={item.quantity}
                removeItem={removeItem}
                addItem={addItem}
              />
            </Card>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
