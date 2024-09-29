import config from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

class UsersService {

    private apiUrl = `${config.usersEndpoint}`;

    async queryUsers(pageIndex: number, pageSize: number) {
        const response = await axiosInstance.get(this.apiUrl,{
            params: {pageIndex, pageSize}
        });

        return response.data;
    }

    async addUser(user: {name: string, email: string, role: string}){
        const response = await axiosInstance.post(this.apiUrl, user);
        return response.data
    }

    async updateUser(user: {id: number, name: string, email: string, role: string}){
        const response = await axiosInstance.put(`${this.apiUrl}/${user.id}`, user);
        return response.data;
    }

    async deleteUser(id: number){
        const response = await axiosInstance.delete(`${this.apiUrl}/${id}`);
        return response.data;
    }

}

export default new UsersService();