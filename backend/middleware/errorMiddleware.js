const notFound = (req, res, next) =>{
    const error= new Error(`Not Found - ${req.originalURL}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; //changes error codes from 200 to 500. if not a 200 error it'll keep it as what ever it is. 
    let message = err.message;

    // (below) checking for mongoose bad object id and have it give back a message instead of html doc
    if (err.name === 'CastError' && err.kind === 'ObjectId'){
        message = `Resource not found`;
        statusCode = 404;
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'Pancakes': err.stack,
    });
};

export { notFound, errorHandler};