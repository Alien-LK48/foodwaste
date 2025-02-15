import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
export default function Navbar() {

    return (
        <div className='p-[10px]'>
            <div className='flex flex-row gap-[100px] items-center'>
                <img src="/public/serpent.jpeg" className='w-[100px] h-[100px] rounded-full' />
                <h1 className='flex text-3xl font-bold '>Serpent</h1>
                <nav className='flex flex-row gap-[15px]'>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/'>HOME</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/about'>ABOUT</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/donation'>DONATIONS</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/contact'>CONTACT US</NavLink>
                </nav>
                <button className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FaSignInAlt className="mr-2" />
                     <Link to='/login'><span>Login</span></Link>   
                </button>
            </div>
        </div>
    )
}
