import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';
import {useGetUserDetailsQuery, useUpdateUserMutation} from '../../slices/usersApiSlice'

const UserEditScreen = () => {
    const navigate = useNavigate();
    const {id: userId}=useParams();
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [isAdmin, setIsAdmin]= useState(false);


    const {data:user, isLoading, refetch, error}= useGetUserDetailsQuery(userId);
    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin)
        }
    },[user]);

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            await updateUser({userId, name, email, isAdmin});
            toast.success('User Updated Successfully');
            refetch();
            navigate('/admin/userList');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    } //end submit handler


    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin' className='my-2' style={{color: '#6987a5'}}>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}  onChange={(e)=> setIsAdmin(e.target.checked)} style={{color: '#6987a5'}}></Form.Check>
                        </Form.Group>
                        
                        <Button type='submit' variant='primary' className='my-2'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}
export default UserEditScreen;

