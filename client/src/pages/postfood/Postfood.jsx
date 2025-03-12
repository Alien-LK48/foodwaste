import React, { useEffect, useState, useContext } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
import axios from "axios";

export default function Postfood() {
    const { userdata } = useContext(Appcontent);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [allComments, setAllComments] = useState([]); // Stores all comments for each post

    // Fetch all food posts
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

    // Fetch comments for a specific food post
    const fetchComments = async (foodId) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/user/getcomments/${foodId}`);
            if (data.success) {
                setAllComments((prev) => ({ ...prev, [foodId]: data.comments }));
            } else {
                console.error("Failed to fetch comments:", data.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchFoodPosts();
    }, []);

    const changeComment = (e, foodId) => {
        setComments({ ...comments, [foodId]: e.target.value });
    };

    const submitComment = async (e, foodId) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/user/postacomment', { 
                foodId, 
                comment: comments[foodId], 
                userid: userdata._id 
            });

            if (data.success) {
                setComments({ ...comments, [foodId]: "" });
                fetchComments(foodId); // Refresh comments after posting
            } else {
                console.error("Failed to post comment:", data.message);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
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
                            <label htmlFor={`comments-${food._id}`} className="btn btn-primary mt-3" 
                                onClick={() => fetchComments(food._id)}>
                                View Comments
                            </label>
                            <input type="checkbox" id={`comments-${food._id}`} className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="text-lg font-bold">Comments on {food.foodName}</h3>

                                    {/* Display all comments */}
                                    <div className="mb-4 max-h-40 overflow-y-auto">
                                        {allComments[food._id] && allComments[food._id].length > 0 ? (
                                            allComments[food._id].map((comment, index) => (
                                                <p key={index} className="p-2 border-b">{comment.userComment}: {comment.comment}</p>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No comments yet.</p>
                                        )}
                                    </div>

                                    {/* Add New Comment */}
                                    <textarea
                                        className="w-full border rounded p-2 mt-2 resize-none"
                                        placeholder="Write your comment..."
                                        onChange={(e) => changeComment(e, food._id)}
                                        value={comments[food._id] || ""}
                                        name='comments'
                                    ></textarea>
                                    <div className="modal-action">
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) => submitComment(e, food._id)}
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
