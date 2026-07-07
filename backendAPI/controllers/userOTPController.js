
let otpStore = {};

export const generateOTP = async (req, res) => {
    // Implementation for generating OTP
    try {
        // getting the phone no.
        const { phone } = req.body;
        // check if the phone number is valid and having 10 digits
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid 10-digit phone number"
            });
        }
        const otp = Math.floor(Math.random() * 900000 + 100000);
        otpStore[phone] = {
            otp: otp.toString(),
            expiresAt: Date.now() + 5 * 60 * 1000
        };
        console.log(otpStore);
        return res.status(200).json({ success: true, message: "OTP generated successfully", phone, otp });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

};

export const verifyOTP = async (req, res) => {

    try {

        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Phone and OTP are required"
            });
        }

        const storedOtp = otpStore[phone];

        if (!storedOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (Date.now() > storedOtp.expiresAt) {

            delete otpStore[phone];

            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });

        }

        if (storedOtp.otp !== otp) {

            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });

        }
        // delete the otp from the store after successful verification.
        delete otpStore[phone];
        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}