import axios from 'axios';
import React, { useState } from 'react'

export default function App3() {
  const [students, setStudents] = useState([]);
  const removeStudent = () => {
    // const rollNo = Number(prompt("Enter the Roll no. of the student to remove:"));
    // if (isNaN(rollNo) || rollNo < 1 || rollNo > students.length) {
    //   alert("Invalid Roll No. enter the valid one");
    //   return;
    // }else{
    //   students.splice(rollNo-1,1);
    //   setStudents([...students]);
    // }
    const name = prompt("Enter the name of the student to remove:");
    const index = students.findIndex(std => std.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
      alert("Student not found. Please enter a valid name.");
    } else {
      students.splice(index, 1);
      setStudents([...students]);
    }
  }
  const getDetails = async () => {
    const res = await axios.get('http://localhost:5000/get');
    try {
      if (res.data.success) {
        console.log(res.data.message);
        setStudents(res.data.data);
      } else {
        console.log(res.data.message);
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const semester = e.target.semester.value;
    const data = { name, email, semester };
    try {
      const res = await axios.post('http://localhost:5000/submit', data);
      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-100 gap-10 px-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Student Management System</h1>
        <form className="flex flex-col gap-4 border-2 border-gray-300 rounded py-2 px-4" action="" method="post" onSubmit={onSubmit}>
          <label className='block text-gray-700 text-sm font-bold mb-2' for="name">Name:</label>
          <input placeholder='Student Name' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" name="name" />
          <br />
          <label className='block text-gray-700 text-sm font-bold mb-2' for="email">Course:</label>
          <input placeholder='Course Name' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="email" name="email" />
          <br />
          <label className='block text-gray-700 text-sm font-bold mb-2' for="semester">Semester:</label>
          <select name="semester" id="semester" className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
          <br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={getDetails}>Get Details</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={removeStudent}>Remove Student</button>
        </form>
      </div>
      {
        students.length > 0 ?
          <div>
            <h2 className="text-xl font-bold mt-6 mb-4">Registered Students:</h2>
            <ul className="border-2 border-gray-300 rounded py-2 px-4 w-full max-w-md bg-white">{
              students.map((std, idx) => {
                return <li key={idx} className="border-b border-gray-300 py-2">{std.name} - {std.email} - {std.semester}</li>
              })
            }</ul>
          </div> :
          <span className="text-gray-600">No students registered yet.</span>
      }
    </div>
  )
}
