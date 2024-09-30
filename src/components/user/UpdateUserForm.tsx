import React from 'react';
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface UpdateUserFormProps {
    user: { id: number, name: string, email: string, role: string };
    onUpdateUser: (updateUser: { id: number, name: string, email: string, role: string }) => void;
    onCancel: () => void;
}

const UpdateUserForm = ({user, onUpdateUser, onCancel}: UpdateUserFormProps) => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

    const onSubmit = (data: { name: string; email: string; role: string }) => {
        onUpdateUser({ id: user.id, ...data }); // Update the user with the new form data
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <Input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                <label className="block text-sm mb-2">Role</label>
                <select
                    className="border px-4 py-2 w-full"
                    {...register('role', { required: 'Role is required' })}
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