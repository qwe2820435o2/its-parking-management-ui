import React, {useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";
import Modal from "@/components/Modal";
import UpdateUserForm from "@/components/user/UpdateUserForm";
import CustomToast from "@/components/CustomToast";
import Pagination from "@/components/Pagination";

const Users = () => {

    const [users, setUsers] = useState([
        {id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin'},
        {id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor'},
        {id: 3, name: 'Bob Smith1', email: 'bob@example.com', role: 'Viewer'},
        {id: 4, name: 'Bob Smith2', email: 'bob@example.com', role: 'Viewer'},
        {id: 5, name: 'Bob Smith3', email: 'bob@example.com', role: 'Viewer'},
        {id: 6, name: 'Bob Smith4', email: 'bob@example.com', role: 'Viewer'},
        {id: 7, name: 'Bob Smith5', email: 'bob@example.com', role: 'Viewer'},
        {id: 8, name: 'Bob Smith6', email: 'bob@example.com', role: 'Viewer'},
        {id: 9, name: 'Bob Smith7', email: 'bob@example.com', role: 'Viewer'},
        {id: 10, name: 'Bob Smith8', email: 'bob@example.com', role: 'Viewer'},
        {id: 11, name: 'Bob Smith9', email: 'bob@example.com', role: 'Viewer'},
        {id: 12, name: 'Bob Smith10-', email: 'bob@example.com', role: 'Viewer'},
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({id: 0, name: '', email: '', role: ''});
    const [toastMessage, setToastMessage] = useState('');

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

            <UserList users={currentUsers} onDeleteUser={handleDeleteUser} onUpdateUser={openUpdateModal} />

            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}  // Total number of users in the mock data
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