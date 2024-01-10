import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword] = useState();
    const [name, setName]= useState('');

    const dispatch = useDispatch();
    const navigate= useNavigate()
    const [register,{isLoading}]= useRegisterMutation();
    const {userInfo} = useSelector((state)=>state.auth);

    const {search}= useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect, navigate])

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Passwords dont Match')
            return;
        }else{
            try {
                const res = await register({name, email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
            } catch (err){
                toast.error(err?.data?.message|| err.error)
            }
        }
    };//end submit handler

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label style={{color: '#1f5b83'}}>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Name' 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}
                        style={{color: '#6987a5'}}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label style={{color: '#1f5b83'}}>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        style={{color: '#6987a5'}}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label style={{color: '#1f5b83'}}>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{color: '#6987a5'}}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label style={{color: '#1f5b83'}}>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password' 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        style={{color: '#6987a5'}}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}> Register </Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col style={{color: '#6987a5'}}>
                Already Have An Account? {' '} <Link to={redirect? `/login?redirect=${redirect}`: '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}//end login Screen

export default RegisterScreen;