import React from 'react';

interface DeleteModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal = ({show, onConfirm, onCancel}: DeleteModalProps) => {

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">Are you sure you want to delete this item?</p>
                <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 mr-4">Yes</button>
                <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2">Cancel</button>
            </div>
        </div>
    );
};

export default DeleteModal;