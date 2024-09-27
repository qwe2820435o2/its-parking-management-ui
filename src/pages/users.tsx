import React, {useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";

const Users = () => {

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Viewer' },
    ]);

    const handleAddUser = (newUser: {name: string, email: string, role: string}) => {
        const newId = users.length + 1;
        setUsers([...users, { id: newId, ...newUser }]);
    }

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <AddUserForm onAddUser={handleAddUser} />

            <UserList users={users} onDeleteUser={handleDeleteUser} />

        </div>
    );
};

export default Users;