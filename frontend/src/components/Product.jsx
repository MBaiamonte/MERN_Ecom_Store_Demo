import React from 'react'
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
    return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'></Card.Img>
        </Link>
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div' className='product-title'>
                    <strong style={{color: '#1f5b83'}}>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div' style={{color: '#6987a5'}}>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as='h3'>
                {product.price}
            </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default Product