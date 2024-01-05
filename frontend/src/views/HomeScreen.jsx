import React from 'react';
// import {useEffect, useState} from 'react';
// import axios from 'axios'
import { useParams } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
    const {pageNumber} = useParams();
    const {data, isLoading, error} = useGetProductsQuery({pageNumber});


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
                    {data.products.map((product)=>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))} 
                </Row>
                <Paginate pages={data.pages} page={data.page}/>
            </>
        )}
    </>
    )
}

export default HomeScreen