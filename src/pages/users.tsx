import React, {useState} from 'react';
import UserList from "@/components/user/UserList";
import AddUserForm from "@/components/user/AddUserForm";
import Modal from "@/components/Modal";

const Users = () => {

    const [users, setUsers] = useState([
        {id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin'},
        {id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Editor'},
        {id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Viewer'},
    ]);

    const [showModal, setShowModal] = useState(false);

    const handleAddUser = (newUser: { name: string, email: string, role: string }) => {
        const newId = users.length + 1;
        setUsers([...users, {id: newId, ...newUser}]);
        setShowModal(false);
    }

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            <button type="submit" onClick={() => setShowModal(true)}
                    className="bg-primary text-white px-4 py-2 mb-6">Add User
            </button>

            <UserList users={users} onDeleteUser={handleDeleteUser}/>
            
            <Modal show={showModal} onClose={()=> setShowModal(false)} title="Add New User">
                <AddUserForm onAddUser={handleAddUser}/>
            </Modal>

        </div>
    );
};

export default Users;