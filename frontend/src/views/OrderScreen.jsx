import React from 'react';
import { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useGetOrderDetailsQuery, usePayOderMutation, useGetPayPalClientIdQuery, useDeliverOrderMutation} from '../slices/ordersApiSlice';


const OrderScreen = () => {
    const {id:orderId}=useParams();
    const {data:order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);

    const [payOrder, {isLoading: loadingPay}] = usePayOderMutation();
    const [deliverOrder, {isLoading: loadingDeliver}]= useDeliverOrderMutation();
    const [{isPending}, paypalDispatch]= usePayPalScriptReducer();

    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();

    const {userInfo} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async ()=>{
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({type:'setLoadingStatus', value: 'pending'})
            }
            if(order && !order.isPaid){
                if(!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    },[order,paypal, paypalDispatch, loadingPayPal, errorPayPal]);

//  handlers and functions for paypal (find in paypal documentation)
    function onApprove(data, actions){
        return actions.order.capture().then(async function(details){ //<--details comes from paypal
            try {
                await payOrder({orderId, details}).unwrap();
                refetch();
                toast.success('Payment Successful');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }//end onApprover


    function onError(err){
        toast.error(err.message)
    } //end onError

    function createOrder(data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount:{
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId)=>{
            return orderId;
        });
    }//end createOrder 

    const deliverOrderHandler = async ()=>{
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }// end deliverOrderHandler


    return isLoading ? 
    (<Loader/>) : error? ( <Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
            <h1> Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p style={{color: '#6987a5'}}>
                                <strong style={{color: '#1f5b83'}}>Name: </strong> {order.user.name}
                            </p>
                            <p style={{color: '#6987a5'}}>
                                <strong style={{color: '#1f5b83'}}>Email: </strong> {order.user.email}
                            </p>
                            <p style={{color: '#6987a5'}}>
                                <strong style={{color: '#1f5b83'}}>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Delivered
                                </Message>
                            ) }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p style={{color: '#6987a5'}}>
                                <strong style={{color: '#1f5b83'}}>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not Paid
                                </Message>
                            ) }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`} style={{color: '#1f5b83'}}>{item.name}</Link>
                                        </Col>
                                        <Col md={4} style={{color: '#6987a5'}}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{color: '#1f5b83'}}>Items</Col>
                                    <Col style={{color: '#6987a5'}}>${order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col style={{color: '#1f5b83'}}>Shipping</Col>
                                    <Col style={{color: '#6987a5'}}>${order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col style={{color: '#1f5b83'}}>Tax</Col>
                                    <Col style={{color: '#6987a5'}}>${order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col style={{color: '#1f5b83'}}>Total</Col>
                                    <Col style={{color: '#6987a5'}}>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {isPending ? <Loader/>:(
                                            <div>
                                                {/* test button --> <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                                                <div>
                                                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                                </div>
                                            </div>
                                        )}
                                    </ListGroup.Item>

                                )}
                            {loadingDeliver && <Loader/>}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}//end order screen view

export default OrderScreen