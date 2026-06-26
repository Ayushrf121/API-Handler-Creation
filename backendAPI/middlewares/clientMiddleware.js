import jwt from 'jsonwebtoken';

const clientMiddleware = (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(404).json({
                success: false,
                message: "Token Missing"
            });
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode; 
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }   
}
export default clientMiddleware;