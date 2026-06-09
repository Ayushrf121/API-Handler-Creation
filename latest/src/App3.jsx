import axios from 'axios';
import React from 'react'

export default function App3() {
    const onSubmit = async(e)=>{
        const name = e.target.name.value;
        const email = e.target.email.value;
        const age = e.target.age.value;
        const data ={name,email,age};
        try{
            const res = await axios.post('http://localhost:3000/submit',data);
            if(res.data.success){
                alert(res.data.message);
            }else{
                alert(res.data.message);
            }
            e.preventDefault();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>
      <form className="flex flex-col gap-4 border-2 border-gray-300 rounded py-2 px-4" action="" method="post" onSubmit={onSubmit}>
        <label className='block text-gray-700 text-sm font-bold mb-2' for="name">Name:</label>
        <input placeholder='Student Name' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" name="name" />
        <br />
        <label className='block text-gray-700 text-sm font-bold mb-2' for="email">Course:</label>
        <input placeholder='Course Name' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="email" name="email" />
        <br />
        <label className='block text-gray-700 text-sm font-bold mb-2' for="age">Age:</label>
        <input placeholder='Student Age' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="number" id="age" name="age" />
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </form>
    </div>
  )
}
