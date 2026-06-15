import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
export default function App6() {
  const { register, handleSubmit, formState: { error }, watch, reset } = useForm();
  const [loader, setLoader] = useState(false);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const updateStudent = async (data) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/students/updateStudent/${editId}`, data);
      if (res.data.success) {
        alert(res.data.message);
        getData();
        reset();
        setEditId(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = async (data) => {
    setLoader(true);
    if (editId) {
      await updateStudent(data);
      setLoader(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/students/createStudent', data);
      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error in submitting", error);
    } finally {
      setLoader(false);
    }
    reset();
  }
  const getData = async () => {
    const res = await axios.get('http://localhost:5000/api/students/getStudents');
    try {
      if (res.data.success) {
        setStudents(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteStudents = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/students/deleteStudent/${id}`);
      alert(res.data.message);
      getData();
    } catch (error) {
      console.log(error);
    }
  }
  const editStudent = (student) => {
    setEditId(student._id);
    reset({
      username: student.username,
      email: student.email,
      course: student.course,
      semester: student.semester
    })
  }
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-6'>
      <h1 className='text-2xl font-bold'>Form With Database.</h1>
      <form className='flex flex-col gap-4 p-4 bg-red-200 items-center border-2' onSubmit={handleSubmit(onSubmit)}>
        <input className='border-2 outline-none' type="text" placeholder='Name' {...register('username', { required: true, minLength: { value: 3, message: "Name must be of atleast 3 letters" }, maxLength: { value: 30, message: "Maximum 30 letter's name is allowed" } })} />
        <input className='border-2 outline-none p-2' type="email" placeholder='Email' {...register('email', { required: true })} />
        <select className='border-2 outline-none p-2' {...register('course', { required: true })}>
          <option value="">Select</option>
          <option value="Btech">Btech</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
        </select>
        <select className='border-2 outline-none p-2' {...register('semester', { required: true })}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button>
          {
            loader ? "Loading..." : "Submit"
          }
        </button>
      </form>
      <div>
        <h1 className='text-2xl font-bold'>Form Data from Database</h1>
        {
          students.length > 0 ?
            students.map((items, idx) => {
              return (
                <div key={idx} className='border-2 flex flex-col p-4 bg-gray-300'>
                  <div className='flex flex-col items-start border-2 p-4 gap-2'>
                    <p className='text-2xl font-bold text-green-700'>{items.username}</p>
                    <p>{items.email}</p>
                    <p>{items.course}</p>
                    <p>{items.semester}</p>
                    <button onClick={() => deleteStudents(items._id)} className='p-2 rounded-2xl px-4 bg-red-500 text-white font-bold active:bg-red-700'>Delete User</button>

                    <button onClick={() => editStudent(items)} className='p-2 rounded-2xl px-6 bg-pink-500 text-white font-bold active:bg-pink-700'>Edit</button>
                  </div>
                </div>
              )
            })
            : <p className='font-bold text-red-700'>No data found click the button below to refresh</p>
        }
        <button onClick={getData} className='border-2 p-2 rounded-2xl px-4 bg-blue-400 active:bg-blue-500 shadow-2xs shadow-gray-500'>Get Data</button>
      </div>
    </div>
  )
}
