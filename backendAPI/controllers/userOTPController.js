
let otpStore = {};

export const generateOTP = async (req, res) => {
    // Implementation for generating OTP
    try {
        // getting the phone no.
        const { phone } = req.body;
        // check if the phone number is valid and having 10 digits
        if (!phone || phone.length !== 10) {
            return res.status(400).json({ success:false,message: "Invalid phone number or number is less than 10 digits" });
        }
        const otp = Math.floor(Math.random()*900000 + 100000);
        otpStore = {
            phone : phone,
            otp : otp.toString()
        };
        console.log(otpStore);
        return res.status(200).json({ success:true,message: "OTP generated successfully",phone,otp });
    } catch (error) {
        return res.status(500).json({ success:false,message: "Internal server error" });
    }

};

export const verifyOTP = async (req, res) => {
    // Implementation for verifying OTP
    try {
        const {phone, otp} = req.body;
        if(!phone || !otp){
            return res.status(400).json({ success:false,message: "Phone number and OTP are required" });
        }
        if(otpStore.phone !== phone){
            return res.status(400).json({ success:false,message: "Phone number does not match" });
        }
        // == or === can be used for comparison but === is preferred as it checks for both value and type but since the otp is stored as string and the input otp is number so we can use == for comparison
        if(otpStore.otp != otp){
            return res.status(400).json({ success:false,message: "Invalid OTP" });
        }
        return res.status(200).json({ success:true,message: "OTP verified successfully! You may login now." });
    } catch (error) {
        return res.status(500).json({ success:false,message: "Internal server error" });
    }
}