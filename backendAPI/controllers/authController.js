import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// jwt.sign() takes 3 arguments:
// jwt.sign(payload, secret, options);
import clientModel from '../models/clientModel.js';
import { OAuth2Client } from 'google-auth-library';

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Link of official docs. :- https://developers.google.com/identity/gsi/web/guides/verify-google-id-token#node.js
export const googleSignup = async (req, res) => {
    try {

        // Get Google ID Token from frontend
        const { credential } = req.body;

        // Verify that the token was issued by Google
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Extract user information from the verified token
        const payload = ticket.getPayload();

        const { name, email, email_verified } = payload;

        // Ensure the Google account has a verified email
        if (!email_verified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified."
            });
        }

        // Check if the user already exists
        const existingUser = await clientModel.findOne({ email });

        if (existingUser) {

            // User already registered using Google
            if (existingUser.provider === "google") {
                return res.status(400).json({
                    success: false,
                    message: "This account already exists. Please login using Google."
                });
            }

            // User already registered using Email & Password
            return res.status(400).json({
                success: false,
                message: "This account already exists. Please login using email and password."
            });
        }

        // Create a new Google user
        await clientModel.create({
            name,
            email,
            password: null,
            checkbox: true,
            provider: "google"
        });

        return res.status(201).json({
            success: true,
            message: "Google signup successful. Please login using Google."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const googleLogin = async (req, res) => {

    try {

        // Get Google ID Token
        const { credential } = req.body;

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Extract payload
        const payload = ticket.getPayload();

        const { email, email_verified } = payload;

        // Ensure email is verified
        if (!email_verified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified."
            });
        }

        // Find the user
        const existingUser = await clientModel.findOne({ email });

        // User has not signed up yet
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "No Google account found. Please signup first."
            });
        }

        // User belongs to Email/Password authentication
        if (existingUser.provider === "local") {
            return res.status(400).json({
                success: false,
                message: "This account uses email and password. Please login using email and password."
            });
        }

        // Generate JWT
        const token = generateToken(existingUser);

        return res.status(200).json({
            success: true,
            message: "Google login successful.",
            token
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, checkbox } = req.body;
        const existingUser = await clientModel.findOne({ email });
        if (existingUser) {
            if (existingUser.provider === "google") {
                return res.status(400).json({
                    success: false,
                    message: "This account already exists. Please login using Google."
                });
            }

            return res.status(400).json({
                success: false,
                message: "This account already exists. Please login using email and password."
            });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await clientModel.create({
                name, email, password: hashPassword, checkbox, provider: 'local'
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
            if (existingUser.provider === 'google') {
                return res.status(400).json({
                    success: false,
                    message: "This account uses Google Sign-In. Please continue with Google."
                });
            }
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {
                const token = generateToken(existingUser);
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

export const profile = async (req, res) => {
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