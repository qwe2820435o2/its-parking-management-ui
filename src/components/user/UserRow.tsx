import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {TableCell, TableRow} from "@/components/ui/table";

interface UserRowProps {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    createAt: string;
    isActive: boolean;
    role: string;
    onDelete: (id: number) => void,
    onUpdate: () => void;
}

const UserRow = ({id, username, email, phoneNumber, createAt, isActive, role, onDelete, onUpdate}: UserRowProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        onDelete(id);
        setShowDeleteModal(false);
    }

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phoneNumber}</TableCell>
            <TableCell>{createAt}</TableCell>
            <TableCell>{isActive ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>
                <Button variant="outline" onClick={onUpdate} className="mr-4">
                    Edit
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                    Delete
                </Button>
            </TableCell>

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
        </TableRow>
    );
};

export default UserRow;