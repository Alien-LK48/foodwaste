import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
import { CgProfile } from "react-icons/cg";
import { FaSignInAlt } from 'react-icons/fa';
import { MdDomainVerification } from "react-icons/md";
import axios from 'axios';

export default function ProfileButton() {
    const { isloggedin, setIsloggedin, setUserdata, userdata } = useContext(Appcontent);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:3000/api/auth/logout');
            if (data.success) {
                setUserdata(false);
                setIsloggedin(false);
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const otp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:3000/api/auth/send-verify-otp');
            if (data.success) {
                alert(`OTP sent to your email`);
                navigate('/otp');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} className="relative w-[50px] h-[50px] cursor-pointer rounded-full ring-2 ring-white hover:ring-blue-500 transition">
                    <img
                        src={`http://localhost:3000/profilepics/${userdata?.user?.image}`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-xl rounded-xl border border-gray-300 bg-white w-48">
                    <li>
                        <label htmlFor="my_modal_6" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:scale-[1.03] transition-transform cursor-pointer">
                            <CgProfile size={18} /> Profile
                        </label>
                    </li>
                    <li>
                        <button
                            onClick={isloggedin ? logout : () => navigate('/login')}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 mt-2 rounded-lg hover:scale-[1.03] transition-transform w-full"
                        >
                            <FaSignInAlt size={18} />
                            {isloggedin ? 'Logout' : 'Login'}
                        </button>
                    </li>
                    {!userdata?.user?.isVarified && !userdata?.user?.isNgo && (
                        <li>
                            <button
                                onClick={otp}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 mt-2 rounded-lg hover:scale-[1.03] transition-transform w-full"
                            >
                                <MdDomainVerification size={18} /> Verify
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Modal */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box max-w-xl border-2 border-blue-500 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-bold text-center mb-4 text-blue-700">Welcome {userdata?.user?.name}!</h3>
                    <div className="space-y-2 text-black px-4">

                        <p><strong>Email:</strong> {userdata?.user?.email}</p>
                        <p><strong>Status:</strong> {userdata?.user?.isVarified ? (
                            <span className="text-green-600 font-semibold">Verified</span>
                        ) : (
                            <span className="text-red-600 font-semibold">Not Verified</span>
                        )}</p>
                        <p><strong>Contact No: </strong> {userdata?.user?.phone}</p>
                        <p><strong>Role:</strong> {
                            userdata?.user?.isAdmin ? 'Admin' :
                                userdata?.user?.isNgo ? 'NGO' :
                                    userdata?.user?.isDonor ? 'Donor' :
                                        'User'
                        }</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-6 px-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                            Edit Profile
                        </button>
                        {userdata?.user?.isUser && (
                            <button
                                onClick={() => navigate('/mypost')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                My Posts
                            </button>
                        )}
                    </div>
                    <div className="modal-action">
                        <label
                            htmlFor="my_modal_6"
                            className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-red-600 text-white font-bold text-md shadow-md hover:bg-red-700 transition duration-300 cursor-pointer"
                        >
                            ✕
                        </label>

                    </div>
                </div>
            </div>
        </>
    );
}
