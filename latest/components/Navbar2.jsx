import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar2() {
    return (
        <nav className='flex items-center justify-between w-screen p-3 bg-green-600 sticky top-0'>
            <div className='flex gap-4 items-center justify-center text-[18px] font-bold text-white'>
                <Link className='hover:text-orange-400 transition ease-in-out' to='/'>Home</Link>
                <Link className='hover:text-orange-400 transition ease-in-out' to='/upload'>Upload</Link>
                <Link className='hover:text-orange-400 transition ease-in-out' to='/profile'>Profile</Link>
            </div>
            <div className='flex gap-4 items-center justify-center'>
                <Link className='border-2 border-blue-500 font-bold text-white rounded-2xl px-7 py-3 bg-blue-400 active:bg-blue-500 shadow-2xs shadow-gray-500' to='/login'>Login</Link>
            </div>
        </nav>
    )
}
