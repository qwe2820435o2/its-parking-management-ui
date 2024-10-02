import React, {useState} from 'react';
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



    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            <OrderList
                orders={orders}
                setOrders={setOrders}
            />

        </div>
    );
};

export default Orders;