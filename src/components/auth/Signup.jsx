import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        role: "user"
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.phone || !formData.role) {
            setError("All fields are required!");
            return;
        }
        setError("");
        console.log(formData)
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center p-4 mt-[-20px]"
        >
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border-t-4 border-blue-600"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create an Account</h2>
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Register as</label>
                        <div className="flex space-x-4">
                            {['user', 'donor', 'ngo'].map((role) => (
                                <label key={role} className="flex items-center space-x-1 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className={`w-4 h-4 inline-block border-2 border-blue-500 rounded-full ${formData.role === role ? 'bg-blue-500' : 'bg-white'}`}></span>
                                    <span className="text-gray-800 font-medium">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div><br />
                <p>Already have an account ?  <Link to='/login' className="text-[red]">Login</Link></p>
                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                    Sign Up
                </button>

            </motion.form>
        </motion.div>
    );
}
