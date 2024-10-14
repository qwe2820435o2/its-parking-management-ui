import React from 'react';
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface UpdateUserFormProps {
    user: { id: number, username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string };
    onUpdateUser: (updateUser: { id: number, username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string }) => void;
    onCancel: () => void;
}

const UpdateUserForm = ({user, onUpdateUser, onCancel}: UpdateUserFormProps) => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
            role: user.role,
        }
    });

    const onSubmit = (data: { username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string }) => {
        onUpdateUser({ id: user.id, ...data }); // Update the user with the new form data
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Username</label>
                <Input type="text" {...register('username', {required: 'Username is required'})} />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <Input
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                        }
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Phone Number</label>
                <Input type="text" {...register('phoneNumber', {required: 'Phone number is required'})} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <Input type="text" {...register('passwordHash', {required: 'Password hash is required'})} />
                {errors.passwordHash && <p className="text-red-500 text-sm">{errors.passwordHash.message}</p>}
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
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <Button variant="default" className="bg-primary text-white px-4 py-2">Update</Button>
            <Button type="button" className="bg-gray-500 text-white px-4 py-2" onClick={onCancel}>
                Cancel
            </Button>
        </form>
    );
};

export default UpdateUserForm;