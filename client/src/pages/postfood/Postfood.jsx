import React, { useEffect, useState, useContext } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
import axios from "axios";

export default function Postfood() {
    const { userdata } = useContext(Appcontent);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [allcomments, setAllcomments] = useState([])
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
    const fetchedcomments = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/user/getcomments')
            if (data.success) {
                setAllcomments(data.comments)
            } else {
                setError(data.message || "Failed to fetch food posts");
            }
        } catch (err) {
            setError("Error fetching data");
            console.error("Error:", err);
        }
    }
    useEffect(() => {
        fetchFoodPosts();
        fetchedcomments()
    }, []);

    const changecomment = (e, foodId) => {
        setComments({ ...comments, [foodId]: e.target.value });
    };
    const submitcomment = async (e, foodId) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/user/postacomment', { foodId, comment: comments[foodId], });
            if (data.success) {
                setComments({ ...comments, [foodId]: "" });
                fetchedcomments()
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
                            <label htmlFor={`comments-${food._id}`} className="btn btn-primary mt-3">Comment</label>
                            <input type="checkbox" id={`comments-${food._id}`} className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="text-lg font-bold">Comment on {food.foodName}</h3>
                                    {/* display allcomments */}
                                    {allcomments.length === 0 ? (<p>no comments</p>)
                                        :
                                        allcomments.map((com) => (<div key={com._id}>
                                            <p className="border-2 border-black p-[5px]">{com.comment}</p> <br />
                                        </div>))}
                                    <textarea
                                        className="w-full border rounded p-2 mt-2 resize-none"
                                        placeholder="Write your comment..."
                                        onChange={(e) => changecomment(e, food._id)}
                                        value={comments[food._id] || ""}
                                        name='comments'
                                    ></textarea>
                                    <div className="modal-action">
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) => submitcomment(e, food._id)}
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
