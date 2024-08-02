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
import CardComponent from "../components/CardComponent/index";
import ModalComponent from "../components/ModalComponent/index";
export default function Home() {
  const [inventory, setInventory] = useState<
    { name: string; quantity: number }[]
  >([]);

  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);

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

    setOpen(!open);
  };
  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
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

  const updateItem = async (itemName: string, quantity: number) => {
    const docRef = doc(collection(firestore, "inventory"), itemName);
    await updateDoc(docRef, { quantity: quantity });
    updateInventory();
  };

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

      <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
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
          <Typography variant="h6">Update Item</Typography>
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
            <TextField
              value={quantity}
              fullWidth
              onChange={(e) =>
                e.target.value != ""
                  ? setQuantity(Number(e.target.value))
                  : setQuantity(0)
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                if (itemName !== "") {
                  updateItem(itemName, quantity);
                  setItemName("");
                  setQuantity(0);
                  handleCloseUpdateModal();
                }
              }}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Welcome to Pantrify</Typography>
      <Stack direction="row" gap={2}>
        <Button variant="contained" onClick={handleOpen}>
          Add Item
        </Button>
        <Button variant="contained" onClick={handleOpenUpdateModal}>
          Update Item
        </Button>
      </Stack>

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
              <CardComponent
                name={item.name}
                quantity={item.quantity}
                removeItem={removeItem}
                addItem={addItem}

                UpdateModalOpen={handleOpenUpdateModal}
              />
            </Card >
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
