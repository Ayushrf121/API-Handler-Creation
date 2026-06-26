import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import fetchUserProfile from '../../components/profileFunction/userService';
import api from '../../components/API';
import axios from 'axios';
export default function Upload() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchUserProfile();
      if (res.success) {
        setUser(res.data);
      } else {
        alert("No user found");
      }
    };
    getProfile();
  }, []);
  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('email', user.email);
    formdata.append('file', data.file[0]);
    try {
      const res = await axios.post(api + 'upload', formdata);
      if (res.data.success) {
        alert("Uploaded Successfully");
        navigate('/');
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
    reset();
  }
  return (
    <div>
      {
        user ? <fieldset className='border-2 border-gray-400 shadow-md shadow-gray-300 p-2 gap-4 m-2 h-[86vh] flex items-center justify-center bg-pink-50'>
          <legend className='text-blue-950 font-bold text-shadow-md'>Enter the details</legend>
          <form className="flex flex-col gap-4 border-2 border-gray-300 rounded-2xl p-16 shadow-md shadow-gray-400" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
              <input className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="title" placeholder='Image Title' {...register('title', { required: true })} />
              {
                errors.title && <span className='font-bold text-red-700'>Input Field Required!</span>
              }
            </div>
            <div className='flex flex-col gap-2'>
              <input className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="file" id="file" {...register('file', { required: true })} onChange={(e) => {
                const file = e.target.files[0];
                setPreview(URL.createObjectURL(file));
              }} />
              {
                errors.file && <span className='font-bold text-red-700'>File Upload Required!</span>
              }
            </div>
            <button className='border-2 p-2 rounded-2xl px-4 bg-blue-400 active:bg-blue-500 shadow-2xs shadow-gray-500'>Submit</button>
          </form>
          {
            preview &&
            <img src={preview} width={480} height={480} alt="Preview" />
            // <iframe src={preview} frameBorder="2" width={480} height={480}></iframe>
          }
        </fieldset> :
          <div>
            <h1>No user found!</h1>
            <p>Login to get profile! <a href="/login" className='underline text-blue-500'>Login</a></p>
          </div>
      }
    </div>
  )
}
