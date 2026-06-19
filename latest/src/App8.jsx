import React from 'react'
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from '../components/Navbar';
import {Routes,Route} from 'react-router-dom';
export default function App8() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}
