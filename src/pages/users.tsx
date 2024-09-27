import React, {useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";
import Modal from "@/components/Modal";
import UpdateUserForm from "@/components/user/UpdateUserForm";

const Users = () => {

    const [users, setUsers] = useState([
        {id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin'},
        {id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor'},
        {id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Viewer'},
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({id: 0, name: '', email: '', role: ''});

    const handleAddUser = (newUser: { name: string, email: string, role: string }) => {
        const newId = users.length + 1;
        setUsers([...users, {id: newId, ...newUser}]);
        setShowAddModal(false);
    }

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    const handleUpdateUser = (updateUser: {id: number, name: string, email: string, role: string}) => {
        setUsers(users.map(user => (user.id === updateUser.id? updateUser: user)));
        setShowUpdateModal(false);
    }

    const openUpdateModal = (user: {id: number, name: string, email: string, role: string }) => {
        setCurrentUser(user);
        setShowUpdateModal(true)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <button type="submit" onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white px-4 py-2 mb-6">Add User
            </button>

            <UserList users={users} onDeleteUser={handleDeleteUser} onUpdateUser={openUpdateModal} />

            <Modal show={showAddModal} onClose={()=> setShowAddModal(false)} title="Add User">
                <AddUserForm onAddUser={handleAddUser}/>
            </Modal>

            <Modal show={showUpdateModal} onClose={()=>setShowUpdateModal(false)} title="Update User">
                <UpdateUserForm user={currentUser} onUpdateUser={handleUpdateUser}/>
            </Modal>
        </div>
    );
};

export default Users;