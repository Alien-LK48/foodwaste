import React from 'react'
import { NavLink } from 'react-router-dom'
export default function AdminNav() {
    return (
        <div>
            <div className='bg-white shadow-lg rounded-lg p-4 w-[200px]'>
                <div className='flex flex-col gap-3'>
                    <NavLink
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg text-center transition-all duration-300 
                        ${isActive ? 'bg-red-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                        }
                        to='/admin/admindashboard'
                    >
                        Dashboard
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
