import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface Order {
    plateNumber: string;
    entryTime: string;
    price: number;
}

const Orders = () => {

    const [orders, setOrders] = useState<Order[]>([
        {
            plateNumber: 'ABC123',
            entryTime: '2023-09-29T08:30:00',
            price: 12.50,
        },
        {
            plateNumber: 'XYZ987',
            entryTime: '2023-09-29T09:15:00',
            price: 15.00,
        },
        {
            plateNumber: 'LMN456',
            entryTime: '2023-09-29T10:45:00',
            price: 20.75,
        },
    ]);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDeleteModalOpen(true);
    }

    const confirmDelete = () => {
        setOrders(orders.filter(order => order !== selectedOrder));
        setIsDeleteModalOpen(false);
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Entry Time</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead className="px-4">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell>{order.plateNumber}</TableCell>
                            <TableCell>{order.entryTime}</TableCell>
                            <TableCell>{order.price.toFixed(2)}</TableCell>
                            <TableCell>
                                    <Button variant="ghost" className="mr-4">Edit</Button>
                                    <Button variant="destructive" onClick={()=>handleDeleteClick(order)}>Delete</Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Delete this order?</p>
                    <DialogFooter>
                        <Button variant="destructive" onClick={confirmDelete}>Yes</Button>
                        <Button variant="ghost" onClick={()=> setIsDeleteModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Orders;