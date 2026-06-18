// import React from 'react'

// export default function Navbar({
//     search,
//     setSearch,
//     employees
// }) {

//     const filteredEmployees =
//         search.trim() === ""
//             ? []
//             : employees.filter((emp) =>
//                 emp.empName
//                     .toLowerCase()
//                     .includes(search.toLowerCase())
//             );

//     return (
//         <nav className='bg-gray-800 p-4 flex flex-col items-center relative'>

//             <input
//                 type="search"
//                 placeholder='Search Employee...'
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className='w-[400px] p-3 rounded-xl bg-white outline-none shadow-md'
//             />

//             {
//                 filteredEmployees.length > 0 && (
//                     <div className='absolute top-16 w-[400px] bg-white rounded-xl shadow-lg overflow-hidden'>

//                         {
//                             filteredEmployees.map((emp) => (
//                                 <div
//                                     key={emp._id}
//                                     className='p-3 border-b hover:bg-gray-100 cursor-pointer'
//                                 >
//                                     {emp.empName}
//                                 </div>
//                             ))
//                         }

//                     </div>
//                 )
//             }

//         </nav>
//     )
// }

import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='flex gap-4 p-4 bg-violet-600'>
            {/* <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link> */}

            {/* its has a flag that automatically identify whether the link is active or not */}
            <NavLink style={({isActive})=>({
                color : isActive? 'red': 'black'
            })} to='/'>Home</NavLink>
            <NavLink style={({isActive})=>({
                color : isActive? 'red': 'black'
            })} to='/signup'>Signup</NavLink>
            <NavLink style={({isActive})=>({
                color : isActive? 'red': 'black'
            })} to='/login'>Login</NavLink>
        </nav>
    )
}
