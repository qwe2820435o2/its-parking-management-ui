
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

interface OrderListProps {
    orders: { plateNumber: string; entryTime: string; price: number }[];
    onUpdateOrder: (order: { plateNumber: string; entryTime: string; price: number }) => void;
    onDeleteOrder: (order: { plateNumber: string; entryTime: string; price: number }) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateOrder, onDeleteOrder }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Entry Time</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.map((order, index) => (
                    <TableRow key={index}>
                        <TableCell>{order.plateNumber}</TableCell>
                        <TableCell>{order.entryTime}</TableCell>
                        <TableCell>{order.price.toFixed(2)}</TableCell>
                        <TableCell>
                            <Button variant="outline" onClick={() => onUpdateOrder(order)}
                                    className="mr-4">Edit</Button>
                            <Button variant="destructive" onClick={() => onDeleteOrder(order)}>Delete</Button>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderList;