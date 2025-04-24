import { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appcontent } from "../../components/contextapi/Appcontext";

export default function Newdonate() {
    const [formData, setFormData] = useState({
        name: "",
        donatesFrom: "",
        description: "",
        quantity: "",
        location: "",
        expiryDate: "",
        pickupTime: ""
    });
    const { getuserdata } = useContext(Appcontent)
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!formData.name || !formData.donatesFrom || !formData.description || !formData.quantity || !formData.location || !formData.expiryDate || !formData.pickupTime) {
                setError("All fields are required!");
                return;
            }
            setError("");
            console.log(formData)
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/user/donateFood', { name: formData.name, description: formData.description, quantity: formData.quantity, location: formData.location, expiryDate: formData.expiryDate, donatesFrom: formData.donatesFrom, pickupTime: formData.pickupTime, })
            if (data.success) {
                alert(`publish successfully wait for response`)
                await getuserdata()
                navigate('/donation/alldonations')
            }
            else {
                console.log(error.message)
            }
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center p-4"
        >
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border-t-4 border-green-600"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">New Donation</h2>
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
                        <label className="block text-gray-600 font-semibold">Food Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Donates From</label>
                        <input
                            type="text"
                            name="donatesFrom"
                            value={formData.donatesFrom}
                            onChange={handleChange}
                            placeholder="Restaurants, Hotels, Households, etc."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold">Pickup Time</label>
                        <input
                            type="time"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
                >
                    Submit Donation
                </button>
            </motion.form>
        </motion.div>
    );
}
