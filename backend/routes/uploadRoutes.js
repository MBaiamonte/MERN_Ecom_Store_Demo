import path from  'path';
import express from 'express';
import multer from 'multer';
const router=express.Router();

//specify where we want to store the image (aws or others) here its on the server
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req,file,cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb){
    const filetypes = /jph|jpeg|png/;
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null, true);
    }else{
        cb('Images Only!');
    }
}

const upload=multer({
    storage,
});

router.post('/', upload.single('image'), (req,res)=>{
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`

    });
});

export default router;