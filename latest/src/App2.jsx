import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
export default function App2() {
    const {register,handleSubmit,reset,formState: {errors},watch} = useForm();
    const onSubmit = async(data)=>{
        try{
            const res = await axios.post('http://localhost:3000/submit',data);
            if(res.data.success){
                alert(res.data.message);
                console.log(res.data);
            }else{
                alert(res.data.message);
            }
            reset();
        }catch(err){
            console.log(err);
            alert("Error occurred while submitting the form");
        }
    }
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4 bg-gray-200'>
      <h1 className='text-2xl font-bold'>User Registration Form</h1>
      <form className='flex flex-col gap-4 border-2 border-black p-4' onSubmit={handleSubmit(onSubmit)}>
        <input className='border-2 border-black p-2' type="text" placeholder='Username' {...register('username', { required: true })} />
        {
            errors.username && <span className='text-red-500'>Username is required</span>
        }
        <input className='border-2 border-black p-2' type="email" placeholder='Email' {...register('email', { required: true })} />
        {
            errors.email && <span className='text-red-500'>Email is required</span>
        }
        <input className='border-2 border-black p-2' type="password" placeholder='Password' {...register('password', { required: true })} />
        {
            errors.password && <span className='text-red-500'>Password is required</span>
        }
        <button className='bg-blue-500 text-white p-2 rounded active:bg-blue-600' type="submit">Submit</button>
      </form>
    </div>
  )
}
   