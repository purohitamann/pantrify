import React from 'react';
import { Modal, Box, Typography, Stack, TextField, Button } from '@mui/material';

interface CustomModalProps {
    open: boolean;
    handleClose: () => void;
    title?: string;
    itemName: string;
    setItemName: (value: string) => void;
    addItem: (itemName: string) => void;
}

const index: React.FC<CustomModalProps> = ({ open, handleClose, title = 'Add Item', itemName, setItemName, addItem }) => {
    return (
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
                <Typography variant="h6">{title}</Typography>
                <Stack direction="row" gap={2} flexDirection={"row"}>
                    <TextField
                        value={itemName}
                        fullWidth
                        onChange={(e) => setItemName(e.target.value)}
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
    );
};

export default index;
