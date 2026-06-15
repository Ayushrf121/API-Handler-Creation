import userModel from '../models/userModel.js';

export const createStudent = async (req, res) => {
    try {
        const student = await userModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Student data accepted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await userModel.find();
        res.status(200).json({
            success: true,
            data: students
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await userModel.findByIdAndUpdate(id, req.body);
        if (!student) {
            res.status(404).json({
                success: false,
                message: "Student not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Student updated successfully",
                data: student
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await userModel.findByIdAndDelete(id);
        if (!student) {
            res.status(404).json({
                success: false,
                message: "Student not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Student deleted successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}