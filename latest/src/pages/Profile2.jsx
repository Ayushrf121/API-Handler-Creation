import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import api from '../../components/API';
import { useNavigate } from 'react-router-dom';
import fetchUserService from '../../components/profileFunction/userService';
export default function Profile2() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const onsubmit = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }
  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchUserService();
      if (res.success) {
        setUser(res.data);
      } else {
        alert("No user found! Please Login");
      }
    };
    getProfile();
  }, []);
  return (
    <div>
      {
        user?
        <div className='flex flex-col items-center justify-center w-screen border-2 h-56 mt-4 gap-4 bg-yellow-50'>
          <div className='flex items-center justify-center gap-3 font-bold'>
            <label className='text-[19px] text-blue-950' htmlFor="name">Name: </label>
            <span className='text-2xl text-pink-950 text-shadow-pink-400 border-2 p-2 rounded-3xl shadow-2xs bg-gray-200 shadow-md shadow-gray-800' id='name'>{user.name}</span>
          </div>
          <div className='flex items-center justify-center gap-3 font-bold'>
            <label className='text-[19px] text-blue-950' htmlFor="email">Email: </label>
            <span className='text-2xl text-pink-950 text-shadow-pink-400 border-2 p-2 rounded-3xl shadow-2xs bg-gray-200 shadow-md shadow-gray-800' id='email'>{user.email}</span>
          </div>
          <button onClick={onsubmit} className="bg-blue-600 shadow-xs shadow-blue-600 p-3 px-6 rounded-2xl">Logout</button>
        </div>:
         <div>
            <h1>No user found!</h1>
            <p>Login to get profile! <a href="/login" className='underline text-blue-500'>Login</a></p>
          </div>
      }
    </div>
  )
}
