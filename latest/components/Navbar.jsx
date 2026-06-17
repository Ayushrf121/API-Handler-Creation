import React from 'react'

export default function Navbar({
    search,
    setSearch,
    employees
}) {

    const filteredEmployees =
        search.trim() === ""
            ? []
            : employees.filter((emp) =>
                emp.empName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

    return (
        <nav className='bg-gray-800 p-4 flex flex-col items-center relative'>

            <input
                type="search"
                placeholder='Search Employee...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-[400px] p-3 rounded-xl bg-white outline-none shadow-md'
            />

            {
                filteredEmployees.length > 0 && (
                    <div className='absolute top-16 w-[400px] bg-white rounded-xl shadow-lg overflow-hidden'>

                        {
                            filteredEmployees.map((emp) => (
                                <div
                                    key={emp._id}
                                    className='p-3 border-b hover:bg-gray-100 cursor-pointer'
                                >
                                    {emp.empName}
                                </div>
                            ))
                        }

                    </div>
                )
            }

        </nav>
    )
}