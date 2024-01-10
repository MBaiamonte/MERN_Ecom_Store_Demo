import React from 'react'
import { useEffect } from 'react'; 
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {toast} from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useCreateOrderMutation} from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=> state.cart)

    const [createOrder, {isLoading, error}]= useCreateOrderMutation();
    
    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async ()=>{
        try{
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
        }catch(error){
            toast.error(error)
        }
    };

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
{/* start left col */}
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item style={{color: '#6987a5'}}>
                        <h2 style={{color: '#1f5b83'}}>Shipping</h2>
                        <p>
                            <strong style={{color: '#1f5b83'}}>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item style={{color: '#6987a5'}}>
                        <h2 style={{color: '#1f5b83'}}>Payment Method</h2>
                        <strong style={{color: '#1f5b83'}}>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length ===0 ? (
                            <Message>Your Cart Is Empty</Message>
                        ): (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} style={{color: '#1f5b83'}}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4} style={{color: '#6987a5'}}>
                                                {item.qty} x ${item.price} = ${item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col> 
{/* end left col */}
{/* start right col */}
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summery</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong style={{color: '#1f5b83'}}>Items Sum:</strong>
                                </Col>
                                <Col style={{color: '#6987a5'}}>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                <strong style={{color: '#1f5b83'}}>Shipping:</strong>
                                </Col>
                                <Col style={{color: '#6987a5'}}>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                <strong style={{color: '#1f5b83'}}>Tax:</strong>
                                </Col>
                                <Col style={{color: '#6987a5'}}>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong style={{color: '#1f5b83'}}>Total:</strong>
                                </Col>
                                <Col style={{color: '#6987a5'}}>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error ? <Message variant='danger'>{error.data.message}</Message> : <p className='mt-2' style={{fontStyle: 'italic', color: '#34a853'}}>No Alerts</p>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>Place Order</Button>
                            {isLoading && <Loader/>}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
{/* end right col */}
        </Row>
        </>
    )
} // end PlaceOrderScreen

export default PlaceOrderScreen