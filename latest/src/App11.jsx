import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React from 'react'
import api from '../components/API'
const handler = async ({ credential }) => {
  try {
    const res = await axios.post(api + 'getCredential', {
      credential
    });
    if (res.data.success) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
}
export default function App11() {
  return (
    <div className='flex flex-col items-center w-screen justify-center p-4 gap-4'>
      <h1>Get My Profile</h1>
      <GoogleLogin
        onSuccess={handler}
        onError={(error) => console.log(error)}
        theme='filled_blue'
        text='signin_with'
        size='300'
        shape='pill'
      />
    </div>
  )
}
