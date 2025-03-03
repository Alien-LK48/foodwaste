import React, { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
import ProfileButton from './ProfileButton';
export default function Navbar() {
    const { isloggedin, userdata } = useContext(Appcontent);
    const navigate = useNavigate();
    return (
        <div className='p-4 bg-[#f3f4f6] text-black shadow-2xl'>
            {isloggedin && !userdata?.user?.isVarified && !userdata?.user?.isNgo && (
                <p className='text-center text-red-500 font-semibold mb-4'>
                    Account is not verified. Verify now.
                    
                </p>
            )}

            {isloggedin && userdata?.user?.isNgo && !userdata?.user?.isVarified && (
                <p className='text-center text-red-500 font-semibold mb-4'>
                    Your account is under verification . <Link to='/msg'>see more</Link><hr />
                </p>
            )}

            <div className='relative flex items-center gap-[300px]'>
                <div className='flex items-center gap-4'>
                    <img src='/serpent.jpeg' alt='Logo' className='w-16 h-16 rounded-full' />
                    <h1 className='text-3xl font-bold text-yellow-500'>Serpent</h1>
                </div>
                <div className='flex gap-6'>
                    {isloggedin && userdata?.user?.isAdmin && (<NavLink to='/admin' className=''>Admin dashboard</NavLink>)}
                    {isloggedin && userdata?.user?.isAdmin && (<NavLink to='/allfoodData' className=''>get foodData</NavLink>)}

                    {(!isloggedin || userdata?.user?.isUser || (userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (
                        <>
                            <NavLink to='/' className='ml-[60px]'>Home</NavLink>
                            <NavLink to='/about'>About</NavLink>
                            <NavLink to='/contact'>Contact Us</NavLink>
                        </>
                    )}
                    {isloggedin && userdata?.user?.isUser && (
                        <>
                            <NavLink to='/sell'>Sell a food</NavLink>
                        </>
                    )}
                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (
                        <>
                            <NavLink to='/alldonatedfoods' className='ml-[55px]'>Collect requests</NavLink>
                            <NavLink to='/allcollection'>Collect a food</NavLink>
                            <NavLink to='/map'>See Map</NavLink>
                        </>
                    )}

                    {isloggedin && userdata?.user?.isDonor && (
                        <NavLink to='/donation'>Donations</NavLink>
                    )}

                </div>
                {isloggedin ? (
                    <div className='absolute right-4'>
                        <ProfileButton />
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-blue-600 absolute right-4 text-white font-semibold rounded-lg px-6 py-2 shadow-md hover:bg-blue-700 transition duration-300 ease-in-out'
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}
