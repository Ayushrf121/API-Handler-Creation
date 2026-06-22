import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/API";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const onsubmit = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    useEffect(() => {

        const getProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(api + "profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });

                setUser(res.data.user);

            } catch (error) {

                console.log(error);

            }

        };

        getProfile();

    }, []);

    return (

        <div className="flex flex-col items-center justify-center p-4 border-2 h-96 m-4 gap-3">

            <h1 className="text-3xl font-bold text-blue-950">Profile</h1>

            {user && (

                <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="text-2xl font-bold text-red-950">{user.name}</h2>
                    <p className="text-[18px] text-blue-700 underline">{user.email}</p>
                    <button onClick={onsubmit} className="bg-blue-600 shadow-xs shadow-blue-600 p-3 px-6 rounded-2xl">Logout</button>
                </div>
            )}

        </div>

    );

}