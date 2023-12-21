import Jwt from 'jsonwebtoken';

const generateToken = (res,userId)=>{
    const token = Jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1D'}); //creates token, pass in payload and secret(which is in env file) and token expiration time frame
        //set JWT as http only cookie on server
        res.cookie('jwt', token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV !== 'development', //checks if its in development since secure requires https 
            sameSite:'strict',
            maxAge: 30*24*60*60*1000 // maxAge is in milSeconds so this essentially saying 30 days
        });
}

export default generateToken;