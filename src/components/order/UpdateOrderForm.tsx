import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UpdateOrderFormProps {
    order: {
        id: number;
        plateNumber: string;
        camera_id: string;
        plateImage: string;
        status: number;
        startTime: string;
        endTime: string;
        price: number;
    };
    onUpdateOrder: (order: {
        id: number;
        plateNumber: string;
        camera_id: string;
        plateImage: string;
        status: number;
        startTime: string;
        endTime: string;
        price: number;
    }) => void;
    onCancel: () => void;
}

const UpdateOrderForm = ({ order, onUpdateOrder, onCancel }: UpdateOrderFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            plateNumber: order.plateNumber,
            camera_id: order.camera_id,
            plateImage: order.plateImage,
            status: order.status,
            startTime: order.startTime,
            endTime: order.endTime,
            price: order.price
        }
    });

    const onSubmit = (data: {
        plateNumber: string;
        camera_id: string;
        plateImage: string;
        status: number;
        startTime: string;
        endTime: string;
        price: number;
    }) => {
        onUpdateOrder({ id: order.id, ...data });
    };

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';  // 确保 dateString 存在
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);  // 去掉秒和毫秒，保留 YYYY-MM-DDTHH:MM
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Plate Number</label>
                <Input type="text" {...register('plateNumber', { required: 'Plate number is required' })} />

                {errors.plateNumber && <p className="text-red-500 text-sm">{errors.plateNumber.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Camera ID</label>
                <Input type="text" {...register('camera_id', { required: 'Camera ID is required' })} />
                {errors.camera_id && <p className="text-red-500 text-sm">{errors.camera_id.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Plate Image</label>
                <Input type="text" {...register('plateImage', { required: 'Plate Image is required' })} />
                {errors.plateImage && <p className="text-red-500 text-sm">{errors.plateImage.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Status</label>
                <Input type="number" {...register('status', { required: 'Status is required' })} />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Start Time</label>

                <Input
                    type="datetime-local"
                    value={formatDateForInput(order.startTime)}  // 格式化后的时间
                    {...register('startTime', { required: 'Start time is required' })}
                />
                {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">End Time</label>
                <Input
                    type="datetime-local"
                    value={formatDateForInput(order.endTime)}  // 同样格式化结束时间
                    {...register('endTime', { required: 'End time is required' })}
                />
                {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Price</label>
                <Input type="number" {...register('price', { required: 'Price is required' })} />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="mt-4">
                <Button variant="default" className="bg-primary text-white px-4 py-2">Update</Button>
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};

export default UpdateOrderForm;
