import React from 'react';
import UserRow from "@/components/user/UserRow";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface UserListProps {
    users: { id: number, username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string }[];
    onDeleteUser: (id: number) => void;
    onUpdateUser: (user: {id: number, username: string, email: string, phoneNumber: string, passwordHash: string, isActive: boolean, role: string}) => void;
}

const UserList = ({users, onDeleteUser, onUpdateUser}: UserListProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((user) => (
                    <UserRow key={user.id}
                             id={user.id}
                             name={user.username}
                             email={user.email}
                             role={user.role}
                             onDelete={onDeleteUser}
                             onUpdate={() => onUpdateUser(user)}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default UserList;