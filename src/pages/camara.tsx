import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import CamerasService from "@/services/camerasService";

const Camara = () => {

    const [entranceImage, setEntranceImage] = useState<File | null>(null);
    const [exitImage, setExitImage] = useState<File | null>(null);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        const file = event.target.files?.[0] || null;  // 如果没有文件，则设置为 null
        setImage(file);  // 更新状态
    };

    const handleSubmit = async (image: File | null, cameraType: string) => {
        if (!image) {
            alert(`Please upload an image for the ${cameraType} camera.`);
            return;
        }

        const formData = new FormData();
        formData.append('file', image);  // 将图片添加到表单数据中
        formData.append('cameraId', cameraType);  // 可以添加其他参数，如摄像头类型

        try {
            const response = await CamerasService.uploadImage(image, cameraType);  // 使用服务层方法上传图片

            if (response) {
                alert(`${cameraType} camera image uploaded successfully!`);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('Image upload failed.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Camera Simulation</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Entrance Camera</h2>
                <Input type="file" onChange={(e) => handleFileChange(e, setEntranceImage)}
                       className="block w-full border p-2 mb-2"/>
                {entranceImage && (
                    <div className="mt-4">
                        <img src={URL.createObjectURL(entranceImage)} alt="Entrance"
                             className="w-56 h-auto rounded-md"/>
                    </div>
                )}
                <Button variant="default" onClick={() => handleSubmit(entranceImage, '1')}>
                    Upload
                </Button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Exit Camera</h2>
                <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, setExitImage)}
                    className="block w-full border p-2 mb-2"
                />
                {exitImage && (
                    <div className="mt-4">
                        <img src={URL.createObjectURL(exitImage)} alt="Exit"
                             className="w-56 h-auto rounded-md"/>
                    </div>
                )}

                <Button variant="default" onClick={() => handleSubmit(exitImage, '2')}>
                    Upload
                </Button>
            </div>

        </div>
    );
};

export default Camara;