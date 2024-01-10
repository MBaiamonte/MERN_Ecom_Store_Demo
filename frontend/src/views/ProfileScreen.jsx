import React from 'react';
import { useState, useEffect } from 'react';
import {Table, Form, Button, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {FaTimes} from 'react-icons/fa';
import {useProfileMutation} from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';


const ProfileScreen = () => {
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword]= useState("");
  
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state)=> state.auth);

  const [updateProfile, {isLoading: loadingUpdateProfile}]= useProfileMutation();
  const {data:orders, isLoading, error} = useGetMyOrdersQuery();

  useEffect(()=>{
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email)
    }
  },[userInfo, userInfo.name,userInfo.email]);//end useEffect

  const submitHandler =  async (e)=>{
    e.preventDefault();
    if (password !== confirmPassword){
      toast.error('Passwords Do Not Match')
    } else{
        try {
          const res = await updateProfile({_id: userInfo._id, name,email,password}).unwrap();
          dispatch(setCredentials(res));
          toast.success("Profile Successfully Updated")
        } catch (err) {
          toast.error(err?.data?.message || err.error)
        }
    }
  };//end submit handler


  return (
    <Row>
{/* //start left column */}
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label style={{color: '#1f5b83'}}>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} style={{color: '#6987a5'}}/>
          </Form.Group>
          <Form.Group controlId='email' className='my-2'>
            <Form.Label style={{color: '#1f5b83'}}>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} style={{color: '#6987a5'}}/>
          </Form.Group>
          <Form.Group controlId='password' className='my-2'>
            <Form.Label style={{color: '#1f5b83'}}>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{color: '#6987a5'}}/>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label style={{color: '#1f5b83'}}>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{color: '#6987a5'}}/>
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>Update</Button>
          {loadingUpdateProfile && <Loader/>}
        </Form>
      </Col>

{/* //end left column
//Start right column */}
      <Col md={9}>
        <h2> {name}'s Order History</h2>
        {isLoading ? <Loader/> : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
          ): (
            <Table striped hover responsive className='table-small'>
              <thead>
                <tr>
                  <th style={{color: '#1f5b83'}}>DATE</th>
                  <th style={{color: '#1f5b83'}}>ID</th>
                  <th style={{color: '#1f5b83'}}>TOTAL</th>
                  <th style={{color: '#1f5b83'}}>PAID</th>
                  <th style={{color: '#1f5b83'}}>DELIVERED</th>
                  <th style={{color: '#1f5b83'}}></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order)=>(
                  <tr key={order._id}>
                    <td style={{color: '#6987a5'}}>{order._id}</td>
                    <td style={{color: '#6987a5'}}>{order.createdAt.substring(0,10)}</td>
                    <td style={{color: '#6987a5'}}>{order.totalPrice}</td>
                    <td style={{color: '#34a853'}}>
                      {order.isPaid? (
                        order.paidAt.substring(0,10)
                      ): (
                        <FaTimes style={{color:'red'}}/>
                      )}
                    </td>
                    <td style={{color: '#34a853'}}>
                      {order.isDelivered? (
                        order.deliveredAt.substring(0,10)
                      ): (
                        <FaTimes style={{color:'red'}}/>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
      </Col>
    </Row>
  )
}

export default ProfileScreen