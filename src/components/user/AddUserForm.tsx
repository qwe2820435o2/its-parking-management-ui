import React, {useState} from 'react';
import {useForm} from "react-hook-form";

interface AddUserFormProps {
    onAddUser: (user: { name: string, email: string, role: string }) => void;
    onCancel: () => void;
}

const AddUserForm = ({onAddUser, onCancel}: AddUserFormProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            role: 'Viewer'
        }
    });

    const onSubmit = (data: { name: string; email: string; role: string }) => {
        onAddUser(data);
    }

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <input
                    type="text"
                    className="border px-4 py-2 w-full"
                    {...register('name', {required: 'Name is required'})}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    className="border px-4 py-2 w-full"
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
                <button type="submit" className="bg-primary text-white px-4 py-2">Add</button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
);
};

export default AddUserForm;