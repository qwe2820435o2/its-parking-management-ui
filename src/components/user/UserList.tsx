import React from 'react';
import UserRow from "@/components/user/UserRow";

interface UserListProps {
    users: { id: number; name: string; email: string; role: string }[];
    onDeleteUser: (id: number) => void;
    onUpdateUser: (user: {id: number; name: string; email: string; role: string}) => void;
}

const UserList = ({users, onDeleteUser, onUpdateUser}: UserListProps) => {
    return (
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
                <UserRow key={user.id}
                         id={user.id}
                         name={user.name}
                         email={user.email}
                         role={user.role}
                         onDelete={onDeleteUser}
                         onUpdate={() => onUpdateUser(user)}
                />
            ))}
            </tbody>
        </table>
    );
};

export default UserList;