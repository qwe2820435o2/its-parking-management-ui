import React, {useEffect, useState} from 'react';
import OrderList from "@/components/order/OrderList";
import OrdersService from "@/services/ordersService";
import Pagination from "@/components/Pagination";
import CustomToast from "@/components/CustomToast";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import UpdateOrderForm from "@/components/order/UpdateOrderForm";

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
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [toastMessage, setToastMessage] = useState('');

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

    const handleDeleteOrder = async (id: number) => {
        try {
            await OrdersService.deleteOrder(id);
            setToastMessage('Order deleted successfully!');
            queryOrders();  // 删除后重新查询订单
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    // 更新订单
    const handleUpdateOrder = async (updatedOrder: Order) => {
        try {
            await OrdersService.updateOrder(updatedOrder);
            setToastMessage('Order updated successfully!');
            queryOrders();  // 更新后重新查询订单
        } catch (error) {
            console.error('Failed to update order:', error);
        }
        setShowUpdateModal(false);
    };

    const openUpdateModal = (order: Order) => {
        setCurrentOrder(order);
        setShowUpdateModal(true);
    };

    const closeToast = () => setToastMessage('');

    useEffect(() => {
        queryOrders();  // 在 currentPage 变化时查询订单数据
    }, [currentPage]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>

            <OrderList
                orders={orders}
                onUpdateOrder={openUpdateModal}
                onDeleteOrder={handleDeleteOrder}
            />

            <Pagination
                itemsPerPage={ordersPerPage}
                totalItems={totalCount}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Order</DialogTitle>
                    </DialogHeader>
                    {currentOrder && (
                        <UpdateOrderForm
                            order={currentOrder}
                            onUpdateOrder={handleUpdateOrder}
                            onCancel={() => setShowUpdateModal(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {toastMessage && <CustomToast message={toastMessage} onClose={closeToast}/>}
        </div>
    );
};

export default Orders;