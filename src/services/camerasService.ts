import config from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

class CamerasService {

    private apiUrl = `${config.camarasEndpoint}`;

    async uploadImage(file: File, cameraId: string) {
        const formData = new FormData();
        formData.append('file', file);  // 添加图片文件

        // 使用 cameraId 作为查询参数
        const response = await axiosInstance.post(`${this.apiUrl}?cameraId=${cameraId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('response: ',response)
        return response.data;
    }

}

export default new CamerasService();