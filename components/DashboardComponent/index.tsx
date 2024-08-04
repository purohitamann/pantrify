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
import { firestore, auth } from "../../lib/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { get } from "http";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardComponent from "../CardComponent/index";
import ModalComponent from "../ModalComponent/index";
import React from "react";

export default function Home() {
    const [inventory, setInventory] = useState<
        { name: string; quantity: number }[]
    >([]);
    const [userId, setUserId] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);

    // Function to fetch the current user ID from Firebase Auth
    const fetchUserId = async () => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        } else {
            // Handle the case where the user is not logged in
            console.error("User is not logged in");
        }
    };

    const updateInventory = async () => {
        if (!userId) return;

        const snapshot = query(collection(firestore, "users", userId, "inventory"));
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
        if (!userId) return;

        const docRef = doc(collection(firestore, "users", userId, "inventory"), itemName);
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
        if (!userId) return;

        const docRef = doc(collection(firestore, "users", userId, "inventory"), itemName);
        await setDoc(
            docRef,
            {
                quantity: increment(1),
            },
            { merge: true }
        );
        updateInventory();
    };

    const updateItem = async (itemName: string, quantity: number) => {
        if (!userId) return;

        const docRef = doc(collection(firestore, "users", userId, "inventory"), itemName);
        await updateDoc(docRef, { quantity: quantity });
        updateInventory();
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            updateInventory();
        }
    }, [userId]);

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
