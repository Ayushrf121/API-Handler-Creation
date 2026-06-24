import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='application/pdf'){
        cb(null,true);
    }else{
        cb(new Error("only pdf are allowed"),false);
    }
}

const upload = multer({
    storage: storage,
    // Optional function to control which files are uploaded. This is called for every file that is processed.
    fileFilter
});
export default upload;