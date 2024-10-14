import React, {useEffect, useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";
import UpdateUserForm from "@/components/user/UpdateUserForm";
import CustomToast from "@/components/CustomToast";
import Pagination from "@/components/Pagination";
import UsersService from "@/services/usersService";
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';


interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const usersPerPage = 10;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({id: 0, username: '', email: '', phoneNumber: '', passwordHash: '', isActive: true, role: 'Viewer'});
    const [toastMessage, setToastMessage] = useState('');

    const queryUsers = async () => {
        try {
            const data = await UsersService.queryUsers(currentPage, usersPerPage);
            setUsers(data);
            setTotalCount(data.totalCount)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        queryUsers();
    }, [currentPage]);

    const handleAddUser = (newUser: {
        username: string,
        password: string,
        email: string,
        phoneNumber: string,
        isActive: boolean,
        role: string
    }) => {
        UsersService.addUser(newUser)
            .then(() => {
                setToastMessage('User added successfully!');
                queryUsers();
            })
            .catch(error => {
                console.error('Failed to add user:', error);
            });

        setShowAddModal(false);
    }

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
        setToastMessage('User deleted successfully!');
    }

    const handleUpdateUser = (updateUser: {
        id: number,
        username: string,
        email: string,
        phoneNumber: string,
        passwordHash: string,
        isActive: boolean,
        role: string
    }) => {
        UsersService.updateUser(updateUser)
            .then(()=>{
                setToastMessage('User updated successfully!');
                queryUsers();
            })
            .catch(error => {
                console.error('Failed to update user:', error);
            });

        setShowUpdateModal(false);

    }

    const openUpdateModal = (user: { id: number, username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string }) => {
        setCurrentUser(user);
        setShowUpdateModal(true)
    }

    const closeToast = () => setToastMessage('');

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <Button variant="default" onClick={() => setShowAddModal(true)} className="mb-6">
                Add User
            </Button>

            <UserList users={users} onDeleteUser={handleDeleteUser} onUpdateUser={openUpdateModal}/>

            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={totalCount}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                    </DialogHeader>
                    <AddUserForm onAddUser={handleAddUser} onCancel={() => setShowAddModal(false)}/>
                </DialogContent>
            </Dialog>

            <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update User</DialogTitle>
                    </DialogHeader>
                    <UpdateUserForm user={currentUser} onUpdateUser={handleUpdateUser}
                                    onCancel={() => setShowUpdateModal(false)}/>
                </DialogContent>
            </Dialog>

            {toastMessage && <CustomToast message={toastMessage} onClose={closeToast}/>}
        </div>
    );
};

export default Users;