import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DonateNav() {
    return (
        <div className='bg-white shadow-lg rounded-lg p-4 w-[200px]'>
            <h2 className='text-xl font-bold text-gray-700 mb-4 text-center'>Donations</h2>
            <div className='flex flex-col gap-3'>
                <NavLink
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg text-center transition-all duration-300 
                        ${isActive ? 'bg-red-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }
                    to='/donation/newdonate'
                >
                    Donate Now
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg text-center transition-all duration-300 
                        ${isActive ? 'bg-red-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }
                    to='/donation/alldonations'
                >
                    Pending
                </NavLink>
            </div>
        </div>
    );
}
