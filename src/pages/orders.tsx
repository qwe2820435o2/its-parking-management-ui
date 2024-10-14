import React, {useEffect, useState} from 'react';
import OrderList from "@/components/order/OrderList";
import OrdersService from "@/services/ordersService";
import Pagination from "@/components/Pagination";

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

const Orders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ordersPerPage = 10;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // 查询订单数据
    const queryOrders = async () => {
        try {
            const data = await OrdersService.queryOrders(currentPage, ordersPerPage);
            setOrders(data);  // 假设返回的结构中包含 orders 数组
            setTotalCount(data.totalCount);  // 返回的总订单数
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    useEffect(() => {
        queryOrders();  // 在 currentPage 变化时查询订单数据
    }, [currentPage]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            <OrderList
                orders={orders}
            />

            <Pagination
                itemsPerPage={ordersPerPage}
                totalItems={totalCount}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Orders;