import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
export default function App7() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [details, setDetails] = useState([]);
    const [editId, setEditId] = useState(null);
    const updateEmp = async (data) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/employees/updateEmployee/${editId}`, data);
            if (res.data.success) {
                alert(res.data.message);
                getDetails();
                reset();
                setEditId(null);
                return;
            }
        } catch (error) {
            alert("Error in updating the request");
            return;
        }
    }
    const onSubmit = async (data) => {
        if (editId) {
            await updateEmp(data);
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/employees/setDetails', data);
            if (res.data.success) {
                alert(res.data.message);
            }
        } catch (error) {
            alert("Error in saving the details")
            console.log(error);
        }
        reset();
    }
    const getDetails = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/employees/getDetails');
            setDetails(res.data.data);
        } catch (error) {
            alert("No data found!");
            console.log(error);
        }
    }
    const editDetails = async (emp) => {
        setEditId(emp._id);
        reset(
            {
                empName: emp.empName,
                email: emp.email,
                pNo: emp.pNo
            }
        );
    }
    const deleteEmp = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:5000/api/employees/removeEmp/${id}`);
            if(res.data.success){
                alert(res.data.message);
                getDetails();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex p-4 items-center justify-center border-2 bg-gray-200  gap-4'>
            <div className='flex flex-col p-4 items-center justify-center border-2'>
                <h1 className='text-2xl font-bold'>Employee Detail Form</h1>
                <form className='flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-3 p-2 items-center'>
                        <label className='text-[19px]' htmlFor="name">Name :</label>
                        <input className='p-2 rounded-2xl bg-gray-300 px-6 outline-none shadow-md shadow-black' id="name" type="text" placeholder='Username' {...register('empName', { required: { value: true, message: "Name field required" }, minLength: { value: 4, message: "Minimum 3 letters are allowed!" }, maxLength: { value: 30, message: "Maximum 30 letters are allowed!" } })} />
                    </div>
                    {
                        errors.empName && <span className='text-[19px] text-red-600'>{errors.empName.message}</span>
                    }
                    <div className='flex gap-3 p-2 items-center'>
                        <label className='text-[19px]' htmlFor="email">Email :</label>
                        <input className='p-2 rounded-2xl bg-gray-300 px-6 outline-none shadow-md shadow-black' id="email" type="email" placeholder='example@gmail.com' {...register('email', { required: { value: true, message: "Email field required" } })} />
                    </div>
                    {
                        errors.email && <span className='text-[19px] text-red-600'>{errors.email.message}</span>
                    }
                    <div className='flex gap-3 p-2 items-center'>
                        <label className='text-[19px]' htmlFor="number">Phone No. :</label>
                        <input className='p-2 rounded-2xl bg-gray-300 px-6 outline-none shadow-md shadow-black' id="number" type="tel" placeholder='9897XXXXXX' {...register('pNo', { required: { value: true, message: "Phone No. field required" }, minLength: { value: 10, message: "10 digits number required!" }, maxLength: { value: 10, message: "10 digits number required!" } })} />
                    </div>
                    {
                        errors.pNo && <span className='text-[19px] text-red-600'>{errors.pNo.message}</span>
                    }
                    <div className='flex gap-3 p-2'>
                        <input type="checkbox" value="Accepted the Conditions" id="terms" {...register('terms', { required: { value: true, message: "Field required" } })} />
                        <label className='text-[19px]' htmlFor="terms">I accept all the terms &amp; conditions</label>
                    </div>
                    <button className='bg-blue-400 active:bg-blue-600 p-4 px-8 rounded-2xl shadow-md shadow-black'>Submit</button>
                </form>
            </div>
            <div className='flex flex-col border-2 p-4 items-center'>
                <h1 className='text-2xl font-bold'>Get Details</h1>
                {
                    details.length > 0 ? details.map((emp, idx) => {
                        return (
                            <div key={idx} className='flex gap-5 border-2 m-4 p-4'>
                                <div key={idx}>
                                    <p title='Employee Name' className='text-2xl font-bold text-gray-800'>{emp.empName}</p>
                                    <a href='mailto:' className='text-gray-700 underline' title='email'>{emp.email}</a>
                                    <p title='Phone Number' className='text-gray-700'>{emp.pNo}</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => editDetails(emp)} className='bg-green-400 active:bg-green-600 p-2 px-6 font-bold text-white rounded-2xl shadow-md shadow-black'>Edit</button>
                                    <button onClick={() => deleteEmp(emp._id)} className='bg-red-400 active:bg-red-600 p-2 px-6 font-bold text-white rounded-2xl shadow-md shadow-black'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                        <span className='text-[19px] text-red-600'>No details Found click button to refresh</span>
                }
                <button onClick={getDetails} className='bg-blue-400 active:bg-blue-600 p-4 px-4 rounded-2xl shadow-md shadow-black'>Get Details</button>
            </div>
        </div>
    )
}
