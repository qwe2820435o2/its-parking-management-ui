import React, {useEffect, useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";
import Modal from "@/components/Modal";
import UpdateUserForm from "@/components/user/UpdateUserForm";
import CustomToast from "@/components/CustomToast";
import Pagination from "@/components/Pagination";
import UsersService from "@/services/usersService";
import { Button } from '@/components/ui/button';


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
    const [currentUser, setCurrentUser] = useState({id: 0, name: '', email: '', role: ''});
    const [toastMessage, setToastMessage] = useState('');


    useEffect(() => {
        const queryUsers = async ()=>{
            try {
                const data = await UsersService.queryUsers(currentPage, usersPerPage);
                setUsers(data.users);
                setTotalCount(data.totalCount)
            } catch (error){
                console.error('Failed to fetch users:', error);
            }
        };

        queryUsers();
    }, [currentPage]);

    const handleAddUser = (newUser: { name: string, email: string, role: string }) => {
        const newId = users.length + 1;
        setUsers([...users, {id: newId, ...newUser}]);
        setShowAddModal(false);
        setToastMessage('User added successfully!');
    }

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
        setToastMessage('User deleted successfully!');
    }

    const handleUpdateUser = (updateUser: {id: number, name: string, email: string, role: string}) => {
        setUsers(users.map(user => (user.id === updateUser.id? updateUser: user)));
        setShowUpdateModal(false);
        setToastMessage('User updated successfully!');
    }

    const openUpdateModal = (user: {id: number, name: string, email: string, role: string }) => {
        setCurrentUser(user);
        setShowUpdateModal(true)
    }

    const closeToast = ()=> setToastMessage('');

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <button type="submit" onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white px-4 py-2 mb-6">Add User
            </button>

            <UserList users={users} onDeleteUser={handleDeleteUser} onUpdateUser={openUpdateModal} />

            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={totalCount}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Modal show={showAddModal} onClose={()=> setShowAddModal(false)} title="Add User">
                <AddUserForm onAddUser={handleAddUser} onCancel={() => setShowAddModal(false)}/>
            </Modal>

            <Modal show={showUpdateModal} onClose={()=>setShowUpdateModal(false)} title="Update User">
                <UpdateUserForm user={currentUser} onUpdateUser={handleUpdateUser} onCancel={() => setShowUpdateModal(false)}/>
            </Modal>

            {toastMessage && <CustomToast message={toastMessage} onClose={closeToast} />}
        </div>
    );
};

export default Users;