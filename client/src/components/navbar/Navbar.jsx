import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Appcontent } from '../contextapi/Appcontext';
import ForAdmin from '../protectedroute/ForAdmin';
import ProfileButton from './ProfileButton';
export default function Navbar() {
    const { isloggedin, userdata } = useContext(Appcontent)
    return (
        <div className='p-[10px]'>
            {!userdata || !userdata.user || !userdata.user.isVarified && (<p className='text-center text-[red]'>account is not verifyed. verify now</p>)}
            <div className='relative flex flex-row gap-[70px] items-center'>
                <img src="/public/serpent.jpeg" className='w-[100px] h-[100px] rounded-full' />
                <h1 className='flex text-3xl font-bold '>Serpent</h1>
                <nav className='flex flex-row gap-[15px]'>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/'>HOME</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/about'>ABOUT</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/donation'>DONATIONS</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/contact'>CONTACT US</NavLink>
                    {isloggedin && (
                        <ForAdmin><NavLink className={({ isActive }) => (isActive ? 'text-[red]' : 'text-[black]')} to='/surplus-food'>SURPLUS FOOD</NavLink></ForAdmin>
                    )}
                </nav>
                {isloggedin && (<div className='absolute top-4 right-4 rounded-full'>
                    <ProfileButton />
                </div>)}

            </div>
        </div>
    )
}
