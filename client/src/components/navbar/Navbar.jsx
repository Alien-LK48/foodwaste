import React, { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
import ProfileButton from './ProfileButton';
export default function NavBar() {
    const { isloggedin, userdata } = useContext(Appcontent);
    const navigate = useNavigate();
    return (
        <div className='p-4 bg-[#DD8E31] text-black shadow-2xl'>
            {isloggedin && !userdata?.user?.isVarified && !userdata?.user?.isNgo && (
                <p className='text-center text-white font-semibold mb-4'>
                    Account is not verified.  <Link to='/otp'>Verify now.</Link> <hr />
                </p>
            )}
            {isloggedin && userdata?.user?.isNgo && !userdata?.user?.isVarified && (
                <p className='text-center text-white font-semibold mb-4'>
                    Your account is under verification . <Link to='/msg'>see more</Link><hr />
                </p>
            )}

            <div className='relative flex items-center gap-[300px]'>
                <div className='flex items-center gap-4'>
                    <img src='/logo.jpeg' alt='Logo' className='w-16 h-16 rounded-full' />
                    <h1 className='text-3xl font-bold text-[green]'>Food waste</h1>
                </div>
                <div className='flex flex-row align-middle justify-center items-center gap-6'>
                    {isloggedin && userdata?.user?.isAdmin && (<NavLink to='/admin' className=''>Admin dashboard</NavLink>)}
                    {isloggedin && userdata?.user?.isAdmin && (<NavLink to='/allfoodData' className=''>get foodData</NavLink>)}

                    {(!isloggedin || userdata?.user?.isUser || ((userdata?.user?.isDonor)|| userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (<NavLink to='/' className=''>Home</NavLink>)}
                    {(!isloggedin || userdata?.user?.isUser || ((userdata?.user?.isDonor)|| userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (<NavLink to='/about'>About</NavLink>)}
                    {(!isloggedin || userdata?.user?.isUser || ((userdata?.user?.isDonor)|| userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (<NavLink to='/contact'>Contact Us</NavLink>)}
                    

                    {isloggedin && userdata?.user?.isUser && userdata?.user?.isVarified && (<NavLink to='/sell'>Sell a food</NavLink>)}

                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (<NavLink to='/alldonatedfoods' className=''>Collect requests</NavLink>)}
                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (<NavLink to='/allcollection'>Collect a food</NavLink>)}
                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (<NavLink to='/map'>See Map</NavLink>)}
                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (<NavLink to='/allposts'>Posts</NavLink>)}

                    {isloggedin && userdata?.user?.isDonor && userdata?.user?.isVarified && (<NavLink to='/donation'>Donations</NavLink>)}

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
