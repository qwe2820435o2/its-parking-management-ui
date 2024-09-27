import React, {useState} from 'react';

interface AddUserFormProps {
    onAddUser: (user: { name: string, email: string, role: string }) => void
}

const AddUserForm = ({onAddUser}: AddUserFormProps) => {

    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            role: 'Viewer'
        }
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("123: ",newUser)
        onAddUser(newUser);
        setNewUser({name: '',
            email: '',
            role: 'Viewer'});
    }

    return (
        <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm mb-2">Name</label>
                <input
                    type="text"
                    className="border px-4 py-2 w-full"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    className="border px-4 py-2 w-full"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Role</label>
                <select
                    className="border px-4 py-2 w-full"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser,role: e.target.value})}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="bg-primary text-white px-4 py-2">Add User</button>
        </form>
    );
};

export default AddUserForm;