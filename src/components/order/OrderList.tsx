
import React, {useState} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import OrderRow from "@/components/order/OrderRow";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CustomToast from "@/components/CustomToast";

interface Order {
    plateNumber: string;
    entryTime: string;
    price: number;
}

interface OrderListProps {
    orders: { plateNumber: string; entryTime: string; price: number }[];
    setOrders: (orders: Order[]) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders , setOrders}) => {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState('');

    const confirmDelete = () => {
        setOrders(orders.filter(order => order !== selectedOrder));
        setIsDeleteModalOpen(false);
        setToastMessage('User deleted successfully!');
    }

    const handleDeleteClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDeleteModalOpen(true);
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
        setToastMessage('User Edit successfully!');
    }

    const closeToast = ()=> setToastMessage('');

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
                    <OrderRow
                        key={index}
                        plateNumber={order.plateNumber}
                        entryTime={order.entryTime}
                        price={order.price}
                        onUpdate={() => handleEditClick(order)}
                        onDelete={() => handleDeleteClick(order)}
                    />
                ))}
            </TableBody>

            <Dialog open={isDeleteModalOpen} onOpenChange={() => setIsDeleteModalOpen(false)}>
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

            {toastMessage && <CustomToast message={toastMessage} onClose={closeToast} />}
        </Table>
    );
};

export default OrderList;