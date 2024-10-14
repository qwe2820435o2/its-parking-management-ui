import config from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

class OrdersService {

    private apiUrl = `${config.ordersEndpoint}`;

    async queryOrders(pageIndex: number, pageSize: number) {
        const response = await axiosInstance.get(this.apiUrl, {
            params: { pageIndex, pageSize }
        });
        return response.data;
    }

    async deleteOrder(id: number) {
        const response = await axiosInstance.delete(`${this.apiUrl}/${id}`);
        return response.data;
    }

    async updateOrder(order: {
        id: number,
        plateNumber: string,
        camera_id: string,
        plateImage: string,
        status: number,
        startTime: string,
        endTime: string,
        price: number
    }) {
        const response = await axiosInstance.put(`${this.apiUrl}/${order.id}`, order);
        return response.data;
    }
}

export default new OrdersService();