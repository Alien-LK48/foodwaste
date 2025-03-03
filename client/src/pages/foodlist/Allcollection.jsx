import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import { Appcontent } from "../../components/contextapi/Appcontext";
export default function Allcollection() {
    const { userdata } = useContext(Appcontent)
    const [formData, setFormData] = useState({
        nameofOrg: "",
        emailofOrg: "",
        nameofReceiver: "",
        emailofReceiver: "",
        nameofDonor: "",
        emailofDonor: "",
        contactnumofDonor: "",
        locationofDonor: "",
        donatesFrom: "",
        foodname: "",
        quantity: "",
        foodExpdate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:3000/api/ngo/collectfood', formData);
            if (data.success) {
                alert(`Published successfully, wait for response.`);
                setFormData({
                    nameofOrg: "",
                    emailofOrg: "",
                    nameofReceiver: "",
                    emailofReceiver: "",
                    nameofDonor: "",
                    emailofDonor: "",
                    contactnumofDonor: "",
                    locationofDonor: "",
                    donatesFrom: "",
                    foodname: "",
                    quantity: "",
                    foodExpdate: ""
                })
            } else {
                console.log("Error:", data.message || "Unknown error occurred.");
            }
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
        >
            <motion.form
                onSubmit={handleSubmit}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-xl w-[900px] border-t-4 border-blue-600"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">All Collection Form</h2>
                <div className="flex flex-row gap-[5px]">
                    {/* Name of Organization */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Organization Name</label>
                        <input
                            type="text"
                            name="nameofOrg"
                            value={formData.nameofOrg}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email of Organization */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Organization Email</label>
                        <input
                            type="email"
                            name="emailofOrg"
                            value={formData.emailofOrg}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-[5px]">
                    {/* Name of Receiver */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Receiver's Name</label>
                        <input
                            type="text"
                            name="nameofReceiver"
                            value={formData.nameofReceiver}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Email of Receiver */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Receiver's Email</label>
                        <input
                            type="email"
                            name="emailofReceiver"
                            value={formData.emailofReceiver}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-[5px]">
                    {/* Name of Donor */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Donor's Name</label>
                        <input
                            type="text"
                            name="nameofDonor"
                            value={formData.nameofDonor}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email of Donor */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Donor's Email</label>
                        <input
                            type="email"
                            name="emailofDonor"
                            value={formData.emailofDonor}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-[5px]">
                    {/* Contact Number of Donor */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Donor's Contact Number</label>
                        <input
                            type="text"
                            name="contactnumofDonor"
                            value={formData.contactnumofDonor}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Location of Donor */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Donor's Location</label>
                        <input
                            type="text"
                            name="locationofDonor"
                            value={formData.locationofDonor}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-[5px]">
                    {/* Donates From */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Donates From</label>
                        <input
                            type="text"
                            name="donatesFrom"
                            value={formData.donatesFrom}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Food Name */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Food Name</label>
                        <input
                            type="text"
                            name="foodname"
                            value={formData.foodname}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-[5px]">
                    {/* Quantity */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Food Expiry Date */}
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 font-semibold">Food Expiry Date</label>
                        <input
                            type="date"
                            name="foodExpdate"
                            value={formData.foodExpdate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                    Submit
                </motion.button>
            </motion.form>
        </motion.div>
    );
}
