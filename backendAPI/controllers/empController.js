import empModel from '../models/empModel.js';
export const createEmployee = async (req, res) => {
    try {
        await empModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Record Submitted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in submitting data: ${error}`
        })
    }
}
export const getEmployee = async (req, res) => {
    try {
        const employee = await empModel.find();
        res.status(200).json({
            success: true,
            data: employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}