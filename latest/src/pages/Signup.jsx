import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../components/API';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
export default function Signup() {
  const navigate = useNavigate();
  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm();
  const handleGoogleSignup = async ({ credential }) => {
    try {
      const res = await axios.post(api + 'google/signup', {
        credential
      });
      alert(res.data.message);
      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to the server.");
      }

      console.log(error);
    }
  }
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(api + 'signup', data);
      if (res.data.success) {
        alert(res.data.message);
        navigate('/login')
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
      <h1 className='text-3xl font-bold text-blue-950'>Signup Form</h1>
      <form className='flex flex-col p-6 bg-mauve-200 border-2 gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-3 items-center'>
          <label htmlFor="name">Name: </label>
          <input required className=' outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' type="text" id="name" placeholder='David Son' {...register('name')} />
        </div>
        <div className='flex gap-3 items-center'>
          <label htmlFor="email">Email: </label>
          <input required className=' outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' type="email" id="email" placeholder='example@gmail.com' {...register('email')} />
        </div>
        <div className='flex gap-3 items-center'>
          <label htmlFor="password">Password: </label>
          <input required className=' outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' type="password" id="password" placeholder='xxxxxxx' {...register('password')} />
        </div>

        <div className='flex gap-3 items-center'>
          <input required className='' type="checkbox" id="checkbox" placeholder='xxxxxxx' {...register('checkbox')} />
          <label htmlFor="checkbox">I accept all the terms and conditions</label>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => { alert("Google Signup Failed"); }}
          theme='filled_blue'
          size='large'
          width='300'
          text='signin_with'
          shape='rectangular'
        />
        <span>Already have an account ? <a href="/login" className='text-blue-600 underline'>login</a></span>
        <button className='flex items-center justify-center w-24 p-2 rounded-2xl border-gray-300 bg-blue-500 outline-none shadow-md shadow-blue-600'>Signup</button>
      </form>
    </div>
  )
}
