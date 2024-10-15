import config from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

class AuthService {

    private apiUrl = `${config.authLogin}`;


    // 新增登录接口
    async login(credentials: { username: string; password: string }) {
        const response = await axiosInstance.post(`${this.apiUrl}`, credentials);
        return {
            token: response.data.token,
            username: response.data.username,
            role: response.data.role
        };
    }

}

export default new AuthService();