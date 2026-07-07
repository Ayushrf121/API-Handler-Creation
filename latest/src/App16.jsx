import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function App16() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const [gotOTP, setGotOTP] = useState(false);
    const [phone, setPhone] = useState("");

    // Verify OTP
    const onSubmitOTP = async (data) => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/verify-otp",
                {
                    phone,
                    otp: data.otp
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                setGotOTP(false);
                setPhone("");
                reset();
            }

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }

        }
    };

    // Generate OTP
    const onSubmit = async (data) => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/send-otp",
                data
            );

            if (response.data.success) {

                alert(response.data.message);

                // Only for learning
                alert(`OTP : ${response.data.otp}`);

                setPhone(data.phone);
                setGotOTP(true);

                reset();

            }

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }

        }

    };

    return (
        <div className="max-w-md mx-auto mt-10">

            {!gotOTP ? (

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 bg-amber-50 p-5 rounded shadow"
                >

                    <label>Phone Number</label>

                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="border rounded p-2"
                        {...register("phone", {
                            required: true,
                            pattern: /^\d{10}$/
                        })}
                    />

                    {errors.phone && (
                        <span className="text-red-500">
                            Enter a valid 10-digit phone number
                        </span>
                    )}

                    <button
                        className="bg-blue-500 text-white rounded p-2"
                    >
                        Generate OTP
                    </button>

                </form>

            ) : (

                <form
                    onSubmit={handleSubmit(onSubmitOTP)}
                    className="flex flex-col gap-3 bg-amber-50 p-5 rounded shadow"
                >

                    <h2 className="font-bold text-lg">
                        Verify OTP
                    </h2>

                    <p>
                        OTP sent to
                    </p>

                    <p className="font-semibold text-blue-600">
                        {phone}
                    </p>

                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        className="border rounded p-2"
                        {...register("otp", {
                            required: true,
                            pattern: /^\d{6}$/
                        })}
                    />

                    {errors.otp && (
                        <span className="text-red-500">
                            Enter a valid OTP
                        </span>
                    )}

                    <button
                        className="bg-green-500 text-white rounded p-2"
                    >
                        Verify OTP
                    </button>

                </form>

            )}

        </div>
    );
}