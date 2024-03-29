import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import {Table, Button, Row, Col} from 'react-bootstrap';
import { FaEdit, FaTrash} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {toast} from 'react-toastify';
import {useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const {pageNumber} = useParams();
    const {data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading:loadingDelete}]= useDeleteProductMutation();
    

//Start handlers section
    const deleteHandler = async (id)=>{
        if(window.confirm('Are You Sure')){
            try {
                await deleteProduct(id);
                toast.success('Product Deleted')
                refetch();
            } catch (err) {
                toast.error(err?.data?.message ||err.error)
            }
        }//end if
    }//end deleteHandler

    const createProductHandler = async () =>{
        if(window.confirm('Are You Sure You Want To Create A New Product')){
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }//end if statement
    }; // end create product handler

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit/> Create Products
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader/>}
            {loadingDelete && <Loader/>}
            {isLoading ? <Loader/> : error ? <Message variant='danger'>{error.data.message}</Message>: (
                <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th style={{color: '#1f5b83'}}>ID</th>
                            <th style={{color: '#1f5b83'}}>NAME</th>
                            <th style={{color: '#1f5b83'}}>PRICE</th>
                            <th style={{color: '#1f5b83'}}>CATEGORY</th>
                            <th style={{color: '#1f5b83'}}>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((product)=>(
                            <tr key={product._id}>
                                <td style={{color: '#6987a5'}}>{product._id}</td>
                                <td style={{color: '#6987a5'}}>{product.name}</td>
                                <td style={{color: '#6987a5'}}>{product.price}</td>
                                <td style={{color: '#6987a5'}}>{product.category}</td>
                                <td style={{color: '#6987a5'}}>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                        <FaTrash style={{color: 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
                </>
            )}
        </>
    )
}

export default ProductListScreen