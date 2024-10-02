import React from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

interface OrderRowProps {
    plateNumber: string;
    entryTime: string;
    price: number;
    onDelete: () => void;
    onUpdate: () => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ plateNumber, entryTime, price, onDelete, onUpdate }) => {
    return (
        <TableRow>
            <TableCell>{plateNumber}</TableCell>
            <TableCell>{entryTime}</TableCell>
            <TableCell>{price.toFixed(2)}</TableCell>
            <TableCell>
                <Button variant="outline" onClick={() => onUpdate()}
                        className="mr-4">Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>

            </TableCell>
        </TableRow>
    );
};

export default OrderRow;