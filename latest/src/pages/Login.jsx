import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../components/API';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(api + 'login', data);
      if (res.data.success) {
        alert(res.data.message);
        navigate('/')
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error in accessing the backend");
      }
      console.log(error);
    }
    reset();
  }
  return (
    <div className='flex flex-col items-center justify-center m-4 p-4 gap-4'>
      <h1 className='text-3xl font-bold text-blue-950'>Login Form</h1>
      <form className='flex flex-col p-6 bg-mauve-200 border-2 gap-8' onSubmit={handleSubmit(onSubmit)} >
        <div className='flex gap-3 items-center'>
          <label htmlFor="email">Email: </label>
          <input required className=' outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' type="email" id="email" placeholder='example@gmail.com' {...register('email')} />
        </div>
        <div className='flex gap-3 items-center'>
          <label htmlFor="name">Password: </label>
          <input required className=' outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' type="password" id="password" placeholder='xxxxxxx' {...register('password')} />
        </div>
        <span>Create an account <a href="/signup" className='text-blue-600 underline'>Signup</a></span>
        <button className=' cursor-pointer flex items-center justify-center w-24 p-2 rounded-2xl border-gray-300 bg-blue-500 outline-none shadow-md shadow-blue-600'>Login</button>
      </form>
    </div>
  )
}
