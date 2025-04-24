import React, { useContext, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios'
import { Appcontent } from '../../components/contextapi/Appcontext';
export default function Sell() {
    const [formData, setFormData] = useState({
        foodName: "",
        description: "",
        location: "",
        quantity: "",
        price: "",
        expiryDate: ""
    });
    const [error, setError] = useState("");
    const [imgs, setImgs] = useState(null)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const { userdata } = useContext(Appcontent)
    const images = (e) => {
        setImgs(e.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.foodName || !formData.description || !formData.location || !formData.quantity || !formData.price || !formData.expiryDate || !imgs) {
            setError("All fields including image are required!");
            return;
        }
        try {
            setError("");
            const form = new FormData();
            form.append("foodName", formData.foodName);
            form.append("description", formData.description);
            form.append("location", formData.location);
            form.append("quantity", formData.quantity);
            form.append("price", formData.price);
            form.append("expiryDate", formData.expiryDate);
            form.append("demoimg", imgs);
            form.append("userid", userdata.user._id);
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:3000/api/user/sellFood', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (data.success) {
                alert(`Published successfully`);
                setFormData({
                    foodName: "",
                    description: "",
                    location: "",
                    quantity: "",
                    price: "",
                    expiryDate: ""
                });
                setImgs(null);
            } else {
                console.log(data.message || "Unknown error");
            }
        } catch (error) {
            console.log("Upload failed:", error.message);
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
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Sell Your Food</h2>
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
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Food Name</label>
                        <input type="text" maxLength={10} name="foodName" value={formData.foodName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Description</label>
                        <input type="text" maxLength={50} name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Quantity</label>
                        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Price (BDT)</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-semibold">Expiry Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                    <div>
                        <input type="file" name="demoimg" id="" onChange={images} />
                    </div> <br /><br />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
                >
                    Sell Food
                </button>
            </motion.form>
        </motion.div>
    );
}