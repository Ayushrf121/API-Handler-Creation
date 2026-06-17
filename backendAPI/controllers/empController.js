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
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await empModel.findByIdAndUpdate(id, req.body);
        if (!emp) {
            res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Employee Details updated successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await empModel.findByIdAndDelete(id);
        if (emp) {
            res.status(200).json({
                success: true,
                message: "Employee removed from database successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
