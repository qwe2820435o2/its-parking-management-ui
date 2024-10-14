import React from 'react';
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface AddUserFormProps {
    onAddUser: (user: { username: string, password: string, email: string, phoneNumber: string, isActive: boolean, role: string }) => void;
    onCancel: () => void;
}

const AddUserForm = ({onAddUser, onCancel}: AddUserFormProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            isActive: true,
            role: 'Viewer'
        }
    });

    const onSubmit = (data: { username: string, password: string, email: string, phoneNumber: string, isActive: boolean, role: string }) => {
        onAddUser(data);
    }

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <Input type="text" {...register('username', {required: 'Username is required'})} />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <Input type="password" {...register('password', {required: 'Password is required'})} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <Input
                    type="email"
                    {...register('email', {
                        required: 'Email is required', pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                        }
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Phone Number</label>
                <Input type="text" {...register('phoneNumber', {required: 'Phone Number is required'})} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Is Active</label>
                <input type="checkbox" {...register('isActive')} />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Role</label>
                <select
                    className="border px-4 py-2 w-full"
                    {...register('role', {required: 'Role is required'})}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <div className="mt-4">
                <Button variant="default" className="bg-primary text-white px-4 py-2">Add</Button>
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>


            </div>
        </form>
    );
};

export default AddUserForm;