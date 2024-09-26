import React, {useState} from 'react';

const Users = () => {

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Viewer' },
    ]);

    const handleDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left border-b">ID</th>
                        <th className="py-2 px-4 text-left border-b">Name</th>
                        <th className="py-2 px-4 text-left border-b">Email</th>
                        <th className="py-2 px-4 text-left border-b">Role</th>
                        <th className="py-2 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.role}</td>
                            <td className="py-2 px-4">
                                <button onClick={()=>handleDelete(user.id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;