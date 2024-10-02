import React from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface DeleteOrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteOrderDialog: React.FC<DeleteOrderDialogProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Delete this order?</p>
                <DialogFooter>
                    <Button variant="destructive" onClick={onConfirm}>Yes</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteOrderDialog;