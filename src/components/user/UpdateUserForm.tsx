import React, {useState} from 'react';

interface UpdateUserFormProps {
    user: { id: number, name: string, email: string, role: string };
    onUpdateUser: (updateUser: { id: number, name: string, email: string, role: string }) => void
}

const UpdateUserForm = ({user, onUpdateUser}: UpdateUserFormProps) => {

    const [updateUser, setUpdateUser] = useState(user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser(updateUser);
    }

    return (
        <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <input
                    type="text"
                    className="border px-4 py-2 w-full"
                    value={updateUser.name}
                    onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    className="border px-4 py-2 w-full"
                    value={updateUser.email}
                    onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Role</label>
                <select
                    className="border px-4 py-2 w-full"
                    value={updateUser.role}
                    onChange={(e) => setUpdateUser({...updateUser, role: e.target.value})}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <button type="button" className="bg-primary text-white px-4 py-2">Update User</button>
        </form>
    );
};

export default UpdateUserForm;