import React from 'react'
import axios from 'axios';
import api from '../components/API';
import { useForm } from 'react-hook-form';
export default function App() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const handler = async (data) => {
    try {
        const res = await axios.post(api+'submit',data);
        if(res.data.success){
          alert(res.data.message);
        }
    } catch (error) {
      console.log(error);   
    }
    reset();
  }
  return (
    <div className="bg-red-100 flex flex-col items-center h-screen justify-center gap-3">
      <h1 className="text-4xl font-bold text-blue-950 select-none">My Form1</h1>
      <form className="flex flex-col gap-4 border-2 p-4 bg-green-100" onSubmit={handleSubmit(handler)}>
        <input className="border-2 p-2" type="text" placeholder='Username' {...register('username', { required: true, minLength: 3, maxLength: 20 })} />
        {
          errors.username && <span className="text-red-600">Required Field</span>
        }
        <input className="border-2 p-2" type="email" placeholder='Email' {...register('email', { required: true })} />
        {
          errors.email && <span className="text-red-600">Required Field</span>
        }
        <input className="border-2 p-2" type="password" placeholder='Password' {...register('password', { required: true })} />
        {
          errors.password && <span className="text-red-600">Required Field</span>
        }
        <select className="border-2 p-2" {...register('gender')}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {
          errors.gender && <span className="text-red-600">Required Field</span>
        }
        <input className="border-2 p-2 active:bg-blue-500" type="submit" />
      </form>
    </div>
  )
}
