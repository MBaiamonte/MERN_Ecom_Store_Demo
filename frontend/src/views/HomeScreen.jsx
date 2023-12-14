import React from 'react';
// import {useEffect, useState} from 'react';
// import axios from 'axios'
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
    // const [products, setProducts] = useState([])
    // useEffect(()=>{
    //     const fetchProducts = async () =>{
    //         const {data} = await axios.get('/api/products'); //proxy in json package makes it so we don't need to include "http://localhost:5000"
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // },[]) //end use effect
    const {data:products, isLoading, error} = useGetProductsQuery();


    return (
    <>
        { isLoading ? (
            <Loader/> // displays Loader Component while loading which is just a spinner 
        ) : error ? (
            <Message variant= 'danger'>{error?.data?.message || error.error}</Message>
        ) : (
            <>
                <h1>Latest products</h1>
                <Row>
                    {products.map((product)=>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))} 
                </Row>
            </>
        )}
    </>
    )
}

export default HomeScreen