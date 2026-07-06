import React,{useState} from 'react'
import axios from 'axios';
import {useForm} from 'react-hook-form';
export default function App16() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [gotOTP, setGotOTP] = React.useState(false);
    const onSubmitOTP = async (data)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', data);
            if(response.data.success){
                alert('OTP verified successfully!');
            }
        } catch (error) {
            if(error.response){
                alert(`Error: ${error.response.data.message}`);
            }else{
                alert('An error occurred while verifying OTP.');
            }
        }
        reset();
        setGotOTP(false);
    }
    const onSubmit = async (data)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/send-otp', data);
            if(response.data.success){
                alert('OTP sent successfully!');
                alert(`Your OTP is: ${response.data.otp}`); 
                alert(`Your phone is: ${response.data.phone}`); 
                setGotOTP(true);
            }
        } catch (error) {
            if(error.response){
                alert(`Error: ${error.response.data.message}`);
            }else{
                alert('An error occurred while sending OTP.');
            }
        }
        reset();
    }
  return (
    <div>
      <form className='flex flex-col gap-2 bg-amber-50 p-4 rounded-md shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <label className="font-medium" htmlFor="phone">Phone Number:</label>
        <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="tel" id="phone" placeholder="Enter phone number"{...register('phone',{required: true, pattern: /^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/})} />
        {errors.phone && <span className="text-red-500 text-sm">Please enter a valid phone number.</span>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" type="submit">Generate OTP</button>
      </form>
      {
        gotOTP && <form className='flex flex-col gap-2 bg-amber-50 p-4 rounded-md shadow-md mt-4' onSubmit={handleSubmit(onSubmitOTP)}>
            <label>Enter Phone Number:</label>
            <input type="tel" id="phone" placeholder="Enter phone number" {...register('phone', { required: true, pattern: /^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/ })} />
            {errors.phone && <span className="text-red-500 text-sm">Please enter a valid phone number.</span>}
            <label className="font-medium" htmlFor="otp">Enter OTP:</label>
            <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="otp" placeholder="Enter OTP" {...register('otp', { required: true, pattern: /^\d{6}$/ })}/>
            {errors.otp && <span className="text-red-500 text-sm">Please enter a valid 6-digit OTP.</span>}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" type="submit">Verify OTP</button> 
        </form>
      }
    </div>
  )
}
