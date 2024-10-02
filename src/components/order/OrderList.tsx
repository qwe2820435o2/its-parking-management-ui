
import React from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import OrderRow from "@/components/order/OrderRow";

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
                    <OrderRow
                        key={index}
                        plateNumber={order.plateNumber}
                        entryTime={order.entryTime}
                        price={order.price}
                        onUpdate={() => onUpdateOrder(order)}
                        onDelete={() => onDeleteOrder(order)}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderList;