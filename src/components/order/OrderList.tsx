
import React, {useState} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import OrderRow from "@/components/order/OrderRow";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CustomToast from "@/components/CustomToast";

interface Order {
    id: number;
    plateNumber: string;
    camera_id: string;
    plateImage: string;
    status: number;
    startTime: string;
    endTime: string;
    price: number;
}

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders}) => {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState('');

    const confirmDelete = () => {
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

        setIsEditModalOpen(false);
        setToastMessage('User Edit successfully!');
    }

    const closeToast = ()=> setToastMessage('');

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Camera ID</TableHead>
                    <TableHead>Plate Image</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.map((order) => (
                    <OrderRow
                        key={order.id}
                        id={order.id}
                        plateNumber={order.plateNumber}
                        camera_id={order.camera_id}
                        plateImage={order.plateImage}
                        status={order.status}
                        startTime={order.startTime}
                        endTime={order.endTime}
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