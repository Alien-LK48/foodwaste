import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function EditSell() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    location: "",
    quantity: "",
    price: "",
    expiryDate: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/sellFood/${id}`);
        if (response.data.success) {
          setFormData({
            ...response.data.fooddata,
            expiryDate: response.data.fooddata.expiryDate.split("T")[0],
          });
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching food details");
      }
    };

    fetchFoodData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.foodName || !formData.description || !formData.location || !formData.quantity || !formData.price || !formData.expiryDate) {
        setError("All fields are required!");
        return;
      }
      setError("");
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(`http://localhost:3000/api/user/sellFood/${id}`, formData);
      if (data.success) {
        alert("Updated successfully");
        setFormData({
          foodName: "",
          description: "",
          location: "",
          quantity: "",
          price: "",
          expiryDate: ""
        });
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error updating food:", error.message);
      setError("Error updating food post");
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
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Update Your Post</h2>
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
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Food Name</label>
            <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Quantity</label>
            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Price (BDT)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Expiry Date</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg">
          Update Post
        </button>
      </motion.form>
    </motion.div>
  );
}
