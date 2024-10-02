import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import OrderList from "@/components/order/OrderList";

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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('')

    const handleDeleteClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDeleteModalOpen(true);
    }

    const confirmDelete = () => {
        setOrders(orders.filter(order => order !== selectedOrder));
        setIsDeleteModalOpen(false);
    }

    const handleEditClick = (order: Order) => {
        setSelectedOrder(order);
        setNewPrice(order.price.toFixed(2));
        setIsEditModalOpen(true);
    }

    const saveEdit = () => {
        const updatedOrders = orders.map(order =>
            order.plateNumber === selectedOrder?.plateNumber
                ? { ...order, price: parseFloat(newPrice) }
                : order
        );

        setOrders(updatedOrders);
        setIsEditModalOpen(false);
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            <OrderList
                orders={orders}
                onUpdateOrder={handleEditClick}
                onDeleteOrder={handleDeleteClick}
            />

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Delete this order?</p>
                    <DialogFooter>
                        <Button variant="destructive" onClick={confirmDelete}>Yes</Button>
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Order</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="New Price"
                    />
                    <DialogFooter>
                        <Button variant="destructive" onClick={saveEdit}>Save</Button>
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Orders;