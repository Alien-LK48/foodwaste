import React, { useEffect, useState, useContext } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa";
export default function Postfood() {
    const { userdata } = useContext(Appcontent);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [allcommentsbyid, setAllcommentsbyid] = useState([])
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
    }
    useEffect(() => {
        fetchFoodPosts();
    }, []);
    const changecomment = (e, foodId) => {
        setComments({ ...comments, [foodId]: e.target.value });
    };
    const commentsbyid = async (id) => {
        try {
            console.log(id)
            const { data } = await axios.get(`http://localhost:3000/api/user/getcommentsbyid/${id}`)
            if (data.success) {
                setAllcommentsbyid(data.comments)
            }
            else {
                setError(data.message || "Failed to fetch food posts");
            }
        } catch (err) {
            setError("Error fetching data");
            console.error("Error:", err);
        }
    }
    const submitcomment = async (e, foodId) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/user/postacomment', {
                foodId,
                comment: comments[foodId],
                userid: userdata.user._id
            });
            if (data.success) {
                setComments({ ...comments, [foodId]: "" });
                commentsbyid(foodId)
            } else {
                console.error("Failed to post comment:", data.message);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">All Food Posts</h2>
            {loading ? (
                <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : foods.length === 0 ? (
                <p className="text-center text-gray-600">No food posts available</p>
            ) : (
                <div className="flex flex-col w-[400px] h-[470px] overflow-y-auto ml-[450px] gap-6">
                    {foods.map((food) => (
                        <div key={food._id} className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.foodName}</h3>
                            <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                            <p><strong>Price:</strong> ${food.price}</p>
                            <p><strong>Location:</strong> {food.location}</p>
                            <p><strong>Quantity:</strong> {food.quantity}</p>
                            <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
                        
                            {/* Comment Button */}
                            <label htmlFor={`comments-${food._id}`} onClick={() => commentsbyid(food._id)} className="flex items-center justify-center gap-2 mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                                <FaCommentDots /> Comment
                            </label>
                            <input type="checkbox" id={`comments-${food._id}`} className="modal-toggle" />
                            
                            {/* Comment Modal */}
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="text-lg font-bold">Comment on {food.foodName}</h3>
                                    {allcommentsbyid.length === 0 ? (
                                        <p className="text-gray-600 text-center">No comments yet</p>
                                    ) : (
                                        <div className="space-y-3 mt-2">
                                            {allcommentsbyid.map((com) => (
                                                <div key={com._id} className="p-3 border rounded-lg shadow-sm bg-gray-100">
                                                    <p className="text-sm font-semibold text-gray-800">{com.userComment.email}</p> <hr />
                                                    <p className="text-gray-700">{com.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <textarea
                                        className="w-full border rounded p-2 mt-2 resize-none"
                                        placeholder="Write your comment..."
                                        onChange={(e) => changecomment(e, food._id)}
                                        value={comments[food._id] || ""}
                                        name="comments"
                                    ></textarea>
                                    <div className="modal-action flex justify-between">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            onClick={(e) => submitcomment(e, food._id)}
                                        >
                                            Post Comment
                                        </button>
                                        <label htmlFor={`comments-${food._id}`} className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer hover:bg-gray-500 transition">Close</label>
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
