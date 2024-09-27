import React, {useState} from 'react';
import DeleteModal from "@/components/DeleteModal";

interface UserRowProps {
    id: number,
    name: string,
    email: string,
    role: string,
    onDelete: (id: number) => void,
    onUpdate: () => void;
}

const UserRow = ({id, name, email, role, onDelete, onUpdate}: UserRowProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        onDelete(id);
        setShowDeleteModal(false);
    }

    return (
        <tr key={id} className="border-b">
            <td className="py-2 px-4">{id}</td>
            <td className="py-2 px-4">{name}</td>
            <td className="py-2 px-4">{email}</td>
            <td className="py-2 px-4">{role}</td>
            <td className="py-2 px-4">
                <button onClick={onUpdate} className="text-blue-500 hover:underline mr-4">
                    Edit
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="text-red-600 hover:underline">
                    Delete
                </button>
            </td>

            <DeleteModal show={showDeleteModal} onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)}/>
        </tr>
    );
};

export default UserRow;