import React, { useContext, useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontent } from "../contextapi/Appcontext";

export default function Ngosignup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "ngo",
        roletype: "",
        ngoRegNum: "",
        teamMember: "",
        area: ""
    })
    const { setIsloggedin, getuserdata } = useContext(Appcontent)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
     useEffect(() => {
            const loadGoogleMaps = () => {
                const script = document.createElement("script");
                script.src = `https://maps.gomaps.pro/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.onload = () => {

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            async (position) => {
                                const { latitude, longitude } = position.coords;
                                const userLocation = { lat: latitude, lng: longitude };
    
                                const geocoder = new window.google.maps.Geocoder();
                                geocoder.geocode({ location: userLocation }, (results, status) => {
                                    if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                                        const address = results[0].formatted_address;
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            address: address,
                                        }));
                                    }
                                });
                            },
                            (error) => {
                                toast.error("Geolocation failed: " + error.message);
                            }
                        );
                    } else {
                        toast.error("Geolocation is not supported by this browser.");
                    }
                };
                document.head.appendChild(script);
            };
    
            loadGoogleMaps();
        }, []);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError("")
            console.log(formData)
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/auth/register', { email: formData.email, password: formData.password, name: formData.name, phone: formData.phone, role: formData.role, roletype: formData.roletype, ngoRegNum: formData.ngoRegNum, area: formData.area, teamMember: formData.teamMember, address: formData.address })
            if (data.success) {
                setIsloggedin(true)
                await getuserdata()
                navigate('/')
            }
            else {
                setError(data.message)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
        >
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-[650px] flex flex-col md:flex-row">

                <div className="w-[650px]  p-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h2> <br />
                    <div className='flex flex-col justify-center items-center'>
                        <label className="block text-gray-600 font-semibold">Register as</label>
                        <div className="flex space-x-4">
                            <input type="radio" name="role" id="user" onClick={() => { navigate('/signup') }} />
                            <p>user</p>
                            <input type="radio" name="role" id="donor" onClick={() => { navigate('/donorsignup') }} />
                            <p>donor</p>
                            <input type="radio" name="role" id="ngo" defaultChecked />
                            <p>collector</p>
                        </div>
                    </div> <br />
                    {error && (
                        <motion.p className="text-red-500 text-center mt-2" animate={{ x: [0, -10, 10, 0] }}>
                            {error}
                        </motion.p>
                    )}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}>


                        <div>
                            <label className="block text-gray-600 font-semibold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder='Full Name or Organization Name'
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Type of Registrant</label>
                            <select
                                name="roletype"
                                value={formData.roletype}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            >
                                <option value="">Select Type</option>
                                <option value="NGO">NGO</option>
                                <option value="Individual Volunteer">Individual Volunteer</option>
                                <option value="Charity Group">Charity Group</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder='Organization Address'
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold">Operating Areas</label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                required
                                placeholder='regions to collect/distribute food'
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        {formData.roletype === `NGO` && (<div>
                            <label className="block text-gray-600 font-semibold">NGO Registration Number</label>
                            <input
                                type="text"
                                name="ngoRegNum"
                                value={formData.ngoRegNum}
                                onChange={handleChange}
                                required
                                placeholder='Registration Number of NGO'
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>)}
                        {(formData.roletype === `Individual Volunteer` || formData.roletype === `Charity Group`) && (<div>
                            <label className="block text-gray-600 font-semibold">Number of members in Team</label>
                            <input
                                type="text"
                                name="teamMember"
                                value={formData.teamMember}
                                onChange={handleChange}
                                required
                                placeholder='How many member in your team?'
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="off"
                            />
                        </div>)}
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Sign Up</button>
                        <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
                    </motion.form>
                </div>
            </div>
        </motion.div>
    );
}
