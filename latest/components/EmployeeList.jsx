import React from 'react';

export default function EmployeeList({
    employees,
    editDetails,
    deleteEmp
}) {

    return (
        <div className='flex flex-col border-2 p-4 items-center'>
            <h1 className='text-2xl font-bold'>Get Details</h1>

            {
                employees.length > 0 ? (
                    employees.map((emp) => (
                        <div
                            key={emp._id}
                            className='flex gap-5 border-2 m-4 p-4'
                        >
                            <div>
                                <p
                                    title='Employee Name'
                                    className='text-2xl font-bold text-gray-800'
                                >
                                    {emp.empName}
                                </p>

                                <a
                                    href={`mailto:${emp.email}`}
                                    className='text-gray-700 underline'
                                    title='email'
                                >
                                    {emp.email}
                                </a>

                                <p title='Phone Number'>
                                    {emp.pNo}
                                </p>

                                <p>
                                    Salary: ₹{emp.salary}
                                </p>

                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => editDetails(emp)}
                                        className='bg-green-400 active:bg-green-600 p-2 px-6 font-bold text-white rounded-2xl shadow-md shadow-black'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteEmp(emp._id)}
                                        className='bg-red-400 active:bg-red-600 p-2 px-6 font-bold text-white rounded-2xl shadow-md shadow-black'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='text-[19px] text-red-600'>
                        No Employee Found
                    </span>
                )
            }
        </div>
    );
}