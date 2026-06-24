import fileModel from "../models/fileModel.js";
import pdfModel from "../models/pdfModel.js";
export const uploadFile = async (req, res) => {
    try {
        const { originalname, filename, path, size } = req.file;
        const { title } = req.body;
        const file = await fileModel.create({
            title,
            originalName: originalname,
            fileName: filename,
            filePath: path,
            size: size
        });
        res.status(201).json({
            success: true,
            message: "File Uploaded Successfully",
            file
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const pdfFile = async (req, res) => {
    try {
        const {
            filename, originalname, path, size, mimetype
        } = req.file;
        const { title } = req.body;
        const file = await pdfModel.create({
            fileName: filename,
            originalName: originalname,
            size,
            title,
            mimetype
        });
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