import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../components/API';
export default function App13() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [preview, setPreview] = useState(null);
    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append('title', data.title);
        formdata.append('pdfFile', data.file[0]);
        try {
            const res = await axios.post('http://localhost:5000/api/pdfUpload', formdata);
            if (res.data.success) {
                alert("Uploaded Successfully");
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
        reset();
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-10 px-4">
            <h1 className='text-4xl font-bold font-serif text-blue-950'>Multer File Upload</h1>
            <form className="flex flex-col gap-4 border-2 border-gray-300 rounded py-2 px-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="text" id="title" placeholder='Image Title' {...register('title', { required: true })} />
                {
                    errors.title && <span className='font-bold text-red-700'>Input Field Required!</span>
                }
                <input accept='application/pdf' className="border border-gray-300 rounded py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500" type="file" id="file" {...register('file', { required: true })} onChange={(e) => {
                    const file = e.target.files[0];
                    setPreview(URL.createObjectURL(file));
                }} />
                {
                    preview &&
                    // <img src={preview} width={480} height={480} alt="Preview" />
                    <iframe src={preview} frameBorder="2" width={480} height={480}></iframe>
                }
                {
                    errors.file && <span className='font-bold text-red-700'>File Upload Required!</span>
                }
                <button className='border-2 p-2 rounded-2xl px-4 bg-blue-400 active:bg-blue-500 shadow-2xs shadow-gray-500'>Submit</button>
            </form>
        </div>
    )
}
