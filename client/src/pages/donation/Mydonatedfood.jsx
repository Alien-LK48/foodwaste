import React, { useEffect, useState, useContext } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
export default function MyDonatedFood() {
  const { userdata } = useContext(Appcontent);
  const [donatedFoods, setDonatedFoods] = useState([]);
  useEffect(() => {
    console.log("Current userdata:", userdata);
    if (userdata?.user?.donatedFoods) {
      setDonatedFoods(userdata.user.donatedFoods);
    } else {
      console.error("Failed to get data:", userdata);
    }
  }, [userdata]);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Pending foods</h2>

      {donatedFoods.length === 0 ? (
        <p className="text-gray-600 text-center">
          No pending.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {donatedFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-2xl p-4 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold">{food.name}</h3>
              <p className="text-gray-600">{food.description}</p>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Location:</strong> {food.location}
              </p>
              <p>
                <strong>Posted Date:</strong>{" "}
                { new Date(food.createdAt).toDateString()}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {food.expiryDate ? new Date(food.expiryDate).toDateString() : "N/A"}
              </p>
              <p>
                <strong>Pickup Time:</strong> {food.pickupTime || "N/A"}
              </p>
              <p>
                <strong>Status: </strong>
                {food.isreceived ? 'receiving' : 'pending'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
