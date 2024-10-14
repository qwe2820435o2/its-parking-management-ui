import React from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

interface OrderRowProps {
    id: number;
    plateNumber: string;
    camera_id: string;
    plateImage: string;
    status: number;
    startTime: string;
    endTime: string;
    price: number;
    onDelete: () => void;
    onUpdate: () => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ id, plateNumber, camera_id, plateImage, status, startTime, endTime, price, onDelete, onUpdate }) => {
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{plateNumber}</TableCell>
            <TableCell>{camera_id}</TableCell>
            <TableCell>{plateImage}</TableCell>
            <TableCell>{status === 1 ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>{startTime}</TableCell>
            <TableCell>{endTime}</TableCell>
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