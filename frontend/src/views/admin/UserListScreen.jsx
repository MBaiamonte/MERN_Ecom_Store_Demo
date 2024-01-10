import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useDeleteUserMutation, useGetUsersQuery,} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
    if (window.confirm('Are You Sure You Want To Delete This User')) {
        try {
            await deleteUser(id);
            toast.success('User Deleted')
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        }
    };//end delete handler

    return (
    <>
        <h1>Users</h1>
        {loadingDelete}
        {isLoading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'>
            {error?.data?.message || error.error}
            </Message>
            ) : (
        <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th style={{color: '#1f5b83'}}>ID</th>
                    <th style={{color: '#1f5b83'}}>NAME</th>
                    <th style={{color: '#1f5b83'}}>EMAIL</th>
                    <th style={{color: '#1f5b83'}}>ADMIN</th>
                    <th style={{color: '#1f5b83'}}>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user._id}>
                    <td style={{color: '#6987a5'}}>{user._id}</td>
                    <td style={{color: '#6987a5'}}>{user.name}</td>
                    <td>
                        <a href={`mailto:${user.email}`} style={{color: '#6987a5'}}>{user.email}</a>
                    </td>
                    <td style={{color: '#1f5b83'}}>
                        {user.isAdmin ? (
                        <FaCheck style={{ color: 'green' }} />
                        ) : (
                        <FaTimes style={{ color: 'red' }} />
                        )}
                    </td>
                    <td>
                    {!user.isAdmin && ( 
                        <>
                        <LinkContainer to={`/admin/user/${user._id}/edit`} style={{ marginRight: '10px' }}>
                            <Button variant='light' className='btn-sm'>
                                <FaEdit />
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                            <FaTrash style={{ color: 'white' }} />
                        </Button>
                        </>
                    )} 
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
        )}
    </>
    );
};

export default UserListScreen;