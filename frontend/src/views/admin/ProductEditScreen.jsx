import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';
import {useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation} from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
    const navigate = useNavigate();
    const {id: productId}=useParams();
    const [name, setName]= useState('');
    const [price, setPrice]= useState(0);
    const [image, setImage]= useState('');
    const [brand, setBrand]= useState('');
    const [category, setCategory]= useState('');
    const [countInStock, setCountInStock]= useState(0);
    const [description, setDescription] = useState('')

    const {data:product, isLoading, refetch, error}= useGetProductDetailsQuery(productId);
    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage, {isLoading: loadingUpload}]= useUploadProductImageMutation();
    
    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    },[product]);


const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await updateProduct({
            productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }).unwrap(); 
        toast.success('Product updated');
        refetch();
        navigate('/admin/productList');
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler= async (e)=>{
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
    toast.success(res.message);
    setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {isLoading ? <Loader/> : error ? <Message variant='danger'>{error.data.message}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter Image URL' value={image} onChange={(e)=>setImage} style={{color: '#6987a5'}}>
                            </Form.Control>
                            <Form.Control type='file' label='Choose File' onChange={uploadFileHandler}></Form.Control>
                        </Form.Group>
                        {loadingUpload && <Loader/>}

                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Amount' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} style={{color: '#6987a5'}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2'>
                            <Form.Label style={{color: '#1f5b83'}}>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} style={{color: '#6987a5'}}></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-2'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen