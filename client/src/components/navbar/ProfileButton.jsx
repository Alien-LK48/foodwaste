import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Appcontent } from '../contextapi/Appcontext';
import { FaUser } from "react-icons/fa";
import axios from 'axios'
import { CgProfile } from "react-icons/cg";
import { FaSignInAlt } from 'react-icons/fa';
import { MdDomainVerification } from "react-icons/md";
export default function ProfileButton() {
    const { isloggedin, setIsloggedin, setUserdata, userdata } = useContext(Appcontent)
    const navigate = useNavigate()
    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/auth/logout')
            data.success && setUserdata(false)
            data.success && setIsloggedin(false)
            navigate('/login')
        } catch (error) {
            console.log(error.message)
        }
    }
    const otp = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/auth/send-verify-otp')
            if (data.success) {
                alert(`otp sent to your email`)
                navigate('/otp')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} className="relative btn m-1 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                    <img
                        src={`http://localhost:3000/profilepics/${userdata?.user?.image}`}
                        alt="!"
                        className="absolute w-[50px] h-[50px] rounded-full object-cover"
                    />
                </div>

                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box border-2 border-black z-[1] w-[110px] p-2 shadow">
                    <li className='mb-[5px]'>
                        <label htmlFor="my_modal_6" className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <CgProfile />
                            Porfile
                        </label>
                    </li>
                    <li className='mb-[5px]'>
                        <a className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <FaSignInAlt />
                            {isloggedin ? (<p onClick={logout}>Logout</p>) : (<Link to='/login'><span>Login</span></Link>)}
                        </a>
                    </li>
                    <li>
                        {!userdata?.user?.isVarified && !userdata?.user?.isNgo && (<button onClick={otp} className='flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors'>
                            <MdDomainVerification className='ml-[5px]' />
                            Verify</button>)}
                    </li>
                </ul>
            </div>
            {/* modal box */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className='border-4 border-black border-double p-[20px]'>
                        <h3 className="text-black text-2xl font-bold mb-[10px]">Welcome {userdata?.user?.name} !!!</h3>
                        <p className='text-black text-xl mb-[10px]'>Userid:  <span className='font-bold'>{userdata?.user?._id}</span> </p>
                        <p className="text-black mb-[10px]">Registered as: <span className='font-bold'>{userdata?.user?.email}</span> </p>
                        {userdata?.user?.isVarified ? (<p className='text-[green] mb-[10px]'>account is verified</p>) : (<p className='text-[red] font-bold mb-[10px]'>account is not verified</p>)}
                        {userdata?.user?.isAdmin && (<p className='text-black font-bold'>Admin</p>)}
                        {userdata?.user?.isUser && (<p className='text-black font-bold'>User</p>)}
                        {userdata?.user?.isNgo && (<p className='text-black font-bold'>NGO</p>)} <br />
                        {userdata?.user?.isDonor && (<p className='text-black font-bold'>Donor</p>)} <br />
                        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                            Edit Profile
                        </button>
                        <br /> <br />
                        {userdata?.user?.isUser && (<button onClick={() => { navigate('/mypost') }} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                            my post
                        </button>)}
                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
