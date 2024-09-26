import React from 'react';

interface UserRowProps {
    id: number,
    name: string,
    email: string,
    role: string,
    onDelete: (id: number) => void,
}

const UserRow = ({id, name, email, role, onDelete}: UserRowProps) => {
    return (
        <tr key={id} className="border-b">
            <td className="py-2 px-4">{id}</td>
            <td className="py-2 px-4">{name}</td>
            <td className="py-2 px-4">{email}</td>
            <td className="py-2 px-4">{role}</td>
            <td className="py-2 px-4">
                <button onClick={() => onDelete(id)} className="text-red-600 hover:underline">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserRow;