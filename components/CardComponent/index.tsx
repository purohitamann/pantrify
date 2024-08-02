import CardActions from "@mui/material/CardActions";
import { Button, Typography, Stack } from "@mui/material";
import CardContent from "@mui/material/CardContent";
interface CardComponentProps {
    name: string;
    quantity: number;
    removeItem: (name: string) => void;
    addItem: (name: string) => void;
    UpdateModalOpen: (value: boolean) => void;
}
const index: React.FC<CardComponentProps> = ({ name, quantity, removeItem, addItem, UpdateModalOpen }) => {
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
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => UpdateModalOpen(true)}
                >
                    Update Item
                </Button>
            </CardActions>
        </>
    );
};

export default index;