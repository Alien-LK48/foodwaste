import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Appcontent } from '../../components/contextapi/Appcontext';

export default function Alldonatedfoods() {
    const [alldonatefoods, setAlldonatedfoods] = useState([]);
    const { userdata } = useContext(Appcontent);

    const fetchDonatedFoods = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/user/alldonateFoods", {
                withCredentials: true,
            });
            setAlldonatedfoods(data.foods);
        } catch (error) {
            console.error("Error fetching donated foods:", error.message);
        }
    };

    const receivefood = async (foodId) => {
        setAlldonatedfoods(alldonatefoods.map(food =>
            food._id === foodId ? { ...food, isreceived: true, receivedBy: userdata } : food
        ));
        try {
            const { data } = await axios.put(
                "http://localhost:3000/api/user/receivefood",
                { foodid: foodId },
                { withCredentials: true }
            );
            if (data.success) {
                alert("Food received successfully!");
                setAlldonatedfoods(alldonatefoods.map(food =>
                    food._id === foodId ? { ...food, receivedBy: data.receivedBy } : food
                ));
                fetchDonatedFoods()
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error receiving food:", error.message);
            setAlldonatedfoods(alldonatefoods.map(food =>
                food._id === foodId ? { ...food, isreceived: false, receivedBy: null } : food
            ));
        }
    };

    const deleteFood = async (foodId) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/deleteFood/${foodId}`, { withCredentials: true });
            setAlldonatedfoods(alldonatefoods.filter(food => food._id !== foodId));
            alert('Food deleted successfully');
        } catch (error) {
            console.error("Error deleting food:", error.message);
        }
    };

    useEffect(() => {
        fetchDonatedFoods();
    }, []);

    return (
        <>
            <h2 className='text-center font-bold text-3xl py-4 text-blue-700'>Collect requests</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
                {alldonatefoods.length > 0 ? (
                    alldonatefoods.map((food) => (
                        <div key={food._id} className="w-80 p-6 border rounded-md shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
                            <h3 className="text-xl font-bold text-gray-900">{food.name}</h3>
                            <h4 className="text-md text-gray-700 mt-1">Sent by {food.user?.email}</h4>
                            <p className="mt-2 text-gray-600"><strong>Quantity:</strong> {food.quantity}</p>
                            <p className="mt-1 text-gray-600"><strong>Location:</strong> {food.location}</p>
                            <p className="mt-1 text-gray-600"><strong>Expires:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
                            <p className="mt-1 text-gray-600"><strong>Pickup Time:</strong> {food.pickupTime}</p>
                            <p className="mt-1 text-gray-600"><strong>Donated From:</strong> {food.donatesFrom}</p>

                            {food.receivedBy?.email ? (
                                <p className="mt-2 text-green-700 font-semibold">Received By: {food.receivedBy?.email}</p>
                            ) : (
                                <button onClick={() => receivefood(food._id)} className="mt-4 bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 mr-[10px] focus:outline-none transition duration-300">
                                    Receive
                                </button>
                            )}
                            {food.receivedBy?._id === userdata?.user?._id ? (
                                <button
                                    onClick={() => deleteFood(food._id)}
                                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
                                >
                                    Delete
                                </button>
                            ) : (
                                <button
                                    className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Can't delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-700">No donated food available.</p>
                )}
            </div>
        </>
    );
}
