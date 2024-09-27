import React, {useEffect} from 'react';

interface CustomToastProps {
    message: string;
    duration?: number;
    onClose: () => void
}

const CustomToast = ({message, duration = 2, onClose}: CustomToastProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration * 1000);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className="fixed bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 p-4 bg-black text-white rounded-md shadow-lg">
            {message}
        </div>
    );
};

export default CustomToast;