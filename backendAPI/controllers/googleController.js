import googleModel from '../models/googleModel.js';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleController = async(req,res)=>{
    try {
        const {credential} = req.body;
        const ticket = await client.verifyIdToken({
            idToken : credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const{
            name,picture,email,email_verified,sub
        } = payload;

        if(!email_verified){
            return res.status(403).json({
                success: false,
                message: "Credentials are not verified by google."
            })
        }
        const existingUser = await googleModel.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exist in database."
            });
        }
        await googleModel.create({
            name,email,email_verified,picture,sub
        });
        res.status(200).json({
            success:true,
            message:"User Entered successfully"
        });
    } catch (error) {
        console.log(error);
    }
}