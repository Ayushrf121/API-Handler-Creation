import personModel from '../models/personModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import userFile from '../models/userFile.js';
const generateToken = (user) => {
    return jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}
const sendLoginResponse = (res, token) => {
    return res.status(200).json({
        success: true,
        message: "Login Successful",
        token
    });
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;
        let ticket;
        try {
            ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID
            });
        } catch (tokenError) {
            // FIXED: If Google verification fails, explicitly send a 401 instead of a 500
            return res.status(401).json({
                success: false,
                message: "Invalid or expired Google credential token"
            });
        }
        const payload = ticket.getPayload();
        const { name, email, email_verified } = payload;
        if (!email_verified) {
            return res.status(401).json({
                success: false,
                message: "Google email is not verified"
            });
        } else {
            let user = await personModel.findOne({ email });

            if (!user) {
                user = await personModel.create({
                    name,
                    email,
                    password: null,
                    email_verified,
                    provider: 'google'
                });
            }
            const token = generateToken(user);
            return sendLoginResponse(res, token);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await personModel.findOne({ email });
        if (existingUser) {
            if (existingUser.provider === 'google') {
                return res.status(409).json({
                    success: false,
                    message: "An account already exists using Google login"
                });
            }
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login"
            })
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            await personModel.create({
                name, email, password: hashedPass, provider: 'local'
            });
            return res.status(201).json({
                success: true,
                message: "User created successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await personModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist. Please signup."
            });
        }
        if (existingUser.provider === 'google') {
            return res.status(409).json({
                success: false,
                message: "This email uses Google Auth. Please log in with Google."
            });
        }
        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Either email or password is wrong"
            });
        }
        const token = generateToken(existingUser);
        return sendLoginResponse(res, token);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await personModel.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
}

export const fileUploadController = async (req, res) => {
    try {
        const { filename, originalname, path, size, mimetype } = req.file;
        const { title, email} = req.body;
        if (!originalname) {
            return res.status(401).json({
                success: false,
                message: "File error in submission. Try again!"
            });
        }
       const file =  await userFile.create({
            Filename: filename,
            Originalname: originalname,
            Path: path,
            Size: size,
            FileType: mimetype,
            title,
            email
        })
        res.status(201).json({
            success: true,
            message: "Pdf Uploaded Successfully",
            file
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}