import React, {ReactNode} from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = ({show, onClose, title, children}: ModalProps) => {

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">X</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;