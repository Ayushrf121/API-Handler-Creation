import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
export default function App() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const handler2 = async(data,e) =>{
    try {
      const result = await axios.post('http://localhost:5000/submit',data);
      if(result.data.success){
        alert(result.data.message);
        console.log(result.data.data);
      }else{
        alert("Form submission failed");
      }
    } catch (error) {
      console.log(error);
    }
    reset(); // to reset the form after submission
  }
  const handler = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if(result.success){
        alert(result.message);
        console.log(result.data);
      }else{
        alert("Form submission failed");
      }
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="bg-red-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold">My Form1</h1>
      <form className="flex flex-col gap-4 border-2 p-4 bg-green-100" onSubmit={handleSubmit(handler)}>
        <input className="border-2 p-2" type="text" placeholder='Username' {...register('username', { required: true, minLength: 3, maxLength: 20 })} />
        {
          // meaning of using && is that if the first condition is true then only the second condition will be executed.
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
        <input
          type="range"
          min="18"
          max="50"
          defaultValue="18"
          {...register("age", {
            valueAsNumber: true,
            min: 18,
            max: 50,
          })}
        />
        {
          errors.age && <span className="text-red-600">Age must be between 18 and 50</span>
        }
        <input className="border-2 p-2 active:bg-blue-500" type="submit" />
      </form>

      <h1 className="text-2xl font-bold">My Form2</h1>
      <form className="flex flex-col gap-4 border-2 p-4 bg-green-100" onSubmit={handleSubmit(handler2)}>
        <input className="border-2 p-2" type="text" placeholder='Username' {...register('username', { required: true, minLength: 3, maxLength: 20 })} />
        {
          // meaning of using && is that if the first condition is true then only the second condition will be executed.
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
        <input
          type="range"
          min="18"
          max="50"
          defaultValue="18"
          {...register("age", {
            valueAsNumber: true,
            min: 18,
            max: 50,
          })}
        />
        {
          errors.age && <span className="text-red-600">Age must be between 18 and 50</span>
        }
        <input className="border-2 p-2 active:bg-blue-500" type="submit" />
      </form>
    </div>
  )
}
