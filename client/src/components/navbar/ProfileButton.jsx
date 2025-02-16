import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Appcontent } from '../contextapi/Appcontext';
import axios from 'axios'
import { FaSignInAlt } from 'react-icons/fa';
export default function ProfileButton() {
    const { isloggedin, setIsloggedin, setUserdata} = useContext(Appcontent)
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
    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">Click</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><label htmlFor="my_modal_6" className="">Porfile</label></li>
                    <li>
                        <a className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <FaSignInAlt className="mr-2" />
                            {isloggedin ? (<p onClick={logout}>Logout</p>) : (<Link to='/login'><span>Login</span></Link>)}
                        </a>
                    </li>
                </ul>
            </div>
            {/* modal box */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
            </div>
        </>
    )
}
