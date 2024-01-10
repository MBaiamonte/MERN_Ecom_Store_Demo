import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetOrdersQuery} from '../../slices/ordersApiSlice';


const OrderListScreen = () => {
  const {data: orders, isLoading, error} = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? <Loader/> : error? <Message variant='danger'>{error}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th style={{color: '#1f5b83'}}>ORDER ID</th>
              <th style={{color: '#1f5b83'}}>USER</th>
              <th style={{color: '#1f5b83'}}>DATE</th>
              <th style={{color: '#1f5b83'}}>TOTAL</th>
              <th style={{color: '#1f5b83'}}>PAID</th>
              <th style={{color: '#1f5b83'}}>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order)=>(
              <tr key={order._id}>
                <td style={{color: '#6987a5'}}>{order._id}</td>
                <td style={{color: '#6987a5'}}>{order.user && order.user.name}</td>
                <td style={{color: '#6987a5'}}>{order.createdAt.substring(0,10)}</td>
                <td style={{color: '#6987a5'}}>{order.totalPrice}</td>
                <td style={{color: '#34a853'}}>
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ): (
                    <FaTimes style={{color: 'red'}}/>
                  )}
                </td>
                <td style={{color: '#34a853'}}>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ): (
                    <FaTimes style={{color: 'red'}}/>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen;