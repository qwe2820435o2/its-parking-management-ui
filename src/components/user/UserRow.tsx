import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

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
                <Button variant="ghost" onClick={onUpdate} className="mr-4">
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                    Delete
                </Button>
            </td>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure to delete this user?</p>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </tr>
    );
};

export default UserRow;