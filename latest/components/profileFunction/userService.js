import axios from "axios";
import api from "../API";
const fetchUserProfile  = async () => {
    try {
        const res = await axios.get(api + 'profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (res.data.success) {
            return {
                success: true,
                data: res.data.user
            }
        } else {
            return { success: false, error: res.data.message };
        }
    } catch (error) {
        const errorMsg = error.response?.message || error.message || "Something went wrong";
        return { success: false, error: errorMsg };
    }
}
export default fetchUserProfile;