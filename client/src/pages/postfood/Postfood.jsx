import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Appcontent } from "../../components/contextapi/Appcontext";

export default function Postfood() {
    const { userdata } = useContext(Appcontent); // Access userdata to get user ID
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({}); // Store comments for each food post

    useEffect(() => {
        const fetchFoodPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user/foodsellpost");
                if (response.data.success) {
                    setFoods(response.data.foods);
                } else {
                    setError(response.data.message || "Failed to fetch food posts");
                }
            } catch (err) {
                setError("Error fetching data");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodPosts();
    }, []);

    const handleCommentChange = (foodId, value) => {
        setComments((prev) => ({
            ...prev,
            [foodId]: value,
        }));
    };

    const handleCommentSubmit = async (foodId) => {
        const commentText = comments[foodId]?.trim(); // Trim extra spaces
        if (!commentText) return alert("Comment cannot be empty!");

        try {
            if (!userdata || !userdata.user._id) {
                alert("User is not logged in!");
                return;
            }

            const response = await axios.post("http://localhost:3000/api/user/postComment", {
                foodId,
                comment: commentText,
                userId: userdata.user._id, // Send user ID with the comment
            });

            if (response.data.success) {
                alert("Comment posted successfully!");
                setComments((prev) => ({
                    ...prev,
                    [foodId]: "", // Clear input field after submitting
                }));
            } else {
                alert("Failed to post comment.");
            }
        } catch (err) {
            console.error("Error posting comment:", err);
            alert("Error posting comment.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Food Posts</h2>

            {loading ? (
                <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : foods.length === 0 ? (
                <p className="text-center text-gray-600">No food posts available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foods.map((food) => (
                        <div key={food._id} className="border p-6 rounded-lg shadow-lg bg-white">
                            <h3 className="text-xl font-semibold">{food.foodName}</h3>
                            <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                            <p><strong>Price:</strong> ${food.price}</p>
                            <p><strong>Location:</strong> {food.location}</p>
                            <p><strong>Quantity:</strong> {food.quantity}</p>
                            <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>

                            {/* Comment Button & Modal */}
                            <label htmlFor={`comments-${food._id}`} className="btn btn-primary mt-3">Comment</label>
                            <input type="checkbox" id={`comments-${food._id}`} className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="text-lg font-bold">Comment on {food.foodName}</h3>
                                    <textarea
                                        className="w-full border rounded p-2 mt-2 resize-none"
                                        placeholder="Write your comment..."
                                        value={comments[food._id] || ""}
                                        onChange={(e) => handleCommentChange(food._id, e.target.value)}
                                    ></textarea>
                                    <div className="modal-action">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleCommentSubmit(food._id)}
                                        >
                                            Post Comment
                                        </button>
                                        <label htmlFor={`comments-${food._id}`} className="btn">Close</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
