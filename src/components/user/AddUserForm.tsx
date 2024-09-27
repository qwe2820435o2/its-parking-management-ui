import React, {useState} from 'react';

interface AddUserFormProps {
    onAddUser: (user: { name: string, email: string, role: string }) => void;
    onCancel: () => void;
}

const AddUserForm = ({onAddUser, onCancel}: AddUserFormProps) => {

    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            role: 'Viewer'
        }
    )

    const [errors, setErrors] = useState({name: '',
        email: ''})


    const validateForm = () => {
        let formValid = true;
        const errors = {name: '', email: ''};

        if (newUser.name.trim() === '') {
            errors.name = 'Name is required';
            formValid = false;
        }

        if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            errors.email = 'Invalid email address';
            formValid = false;
        }

        setErrors(errors);
        return formValid;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()){
            onAddUser(newUser);
            setNewUser({
                name: '',
                email: '',
                role: 'Viewer'
            });
        }
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
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    className="border px-4 py-2 w-full"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Role</label>
                <select
                    className="border px-4 py-2 w-full"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="bg-primary text-white px-4 py-2">Add User</button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default AddUserForm;