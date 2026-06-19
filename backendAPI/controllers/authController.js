import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// jwt.sign() takes 3 arguments:
// jwt.sign(payload, secret, options);
import clientModel from '../models/clientModel.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password, checkbox } = req.body;
        const existingUser = await clientModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await clientModel.create({
                name, email, password: hashPassword, checkbox
            });
            res.status(200).json({
                success: true,
                message: "Signup successful"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await clientModel.findOne({ email });
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {
                const token = jwt.sign({
                    id: existingUser._id,
                    email: existingUser.email,
                    name: existingUser.name
                }, process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    });
                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    token
                });
            } else {
                return res.status(400).json({
                    message: "Either password or email is incorrect"
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'User does not exist!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const profile = async(req,res)=>{
    try {
        const user = await clientModel.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}