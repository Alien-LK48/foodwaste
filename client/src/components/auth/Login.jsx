import React, { useContext, useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontent } from "../contextapi/Appcontext";
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { setIsloggedin, getuserdata, userdata } = useContext(Appcontent)
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!formData.email || !formData.password) {
                setError("All fields are required!");
                return;
            }
            setError("");
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/auth/login',
                { email: formData.email, password: formData.password })
            if (data.success) {
                setIsloggedin(true)
                await getuserdata()
            }
            else {
                setError(data.message)
            }
        } catch (error) {
            setError(error.message)
        }
    };
    useEffect(() => {
        if (userdata?.user) {
            if (userdata.user.isAdmin) {
                navigate('/admin/admindashboard');
            } else if (userdata.user.isNgo && userdata.user.isVarified) {
                navigate('/alldonatedfoods');
            } else if (userdata.user.isDonor) {
                navigate('/donation/newdonate');
            } else {
                navigate('/');
            }
        }
    }, [userdata, navigate]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center p-4 "
        >
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-blue-600"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome user</h2>
                {error && (
                    <motion.p
                        className="text-red-500 text-sm text-center mb-3 font-semibold"
                        initial={{ x: -10 }}
                        animate={{ x: 10 }}
                        transition={{ yoyo: Infinity, duration: 0.2 }}
                    >
                        {error}
                    </motion.p>
                )}
                <div className="mb-4 relative">
                    <label className="block text-gray-600 font-semibold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-600 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <p>Don't have account ? <Link to='/signup' className="text-[red]">Signup</Link> </p> <br />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                    Log in
                </button>
            </motion.form>
            <ToastContainer />
        </motion.div>
    );
}
