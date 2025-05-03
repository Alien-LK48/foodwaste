import React, { useEffect, useState, useContext, useMemo } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
import axios from "axios";
import { io } from 'socket.io-client'
import { FaCommentDots } from "react-icons/fa";
export default function Postfood() {
    const { userdata } = useContext(Appcontent);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [allcommentsbyid, setAllcommentsbyid] = useState([])
    const socket = useMemo(() => {
        if (!userdata?.user?._id) return null
        return io('http://localhost:3000', {
            query: { userId: userdata.user._id }
        })
    }, [userdata.user?._id])

    const [msg, setMsg] = useState(``)
    const [sendto, setSendto] = useState(``)
    const [id, setId] = useState(``)
    const [showmsg, setShowmsg] = useState([])
    const [sendername, setSendername] = useState(``)
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
        if (!socket) return

        socket.on('connect', () => {
            setId(socket.id)
            console.log('connected', socket.id)
        })
        socket.on('welcome', (s) => {
            console.log(s)
        })
        socket.on('receivedMsg', (data) => {
            setShowmsg((prev) => [...prev, data])
            console.log(data)
        })
        fetchFoodPosts();
        return () => {
            socket.disconnect()
        }
    }, [socket]);
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
    const getid = (e, id, name) => {
        e.preventDefault()
        setSendto(id)
        setSendername(name)
    }
    const submit = (e) => {
        e.preventDefault()
        if (!socket) return
        socket.emit('message', {
            msg,
            sendto,
            from: userdata.user._id,
            name: userdata.user.name
        })
        setShowmsg((prev) => [...prev, { msg, name: "You" }])
        setMsg(``)
    }
    return (
        <div className="p-6 bg-gray-100">
            <h2 className=" text-3xl font-bold text-center text-gray-800 mb-8">All Food Posts</h2>

            <div className="grid grid-cols-2 md:grid-cols-2">
                {/* Chat Area */}
                <div className="bg-white shadow-md rounded-lg p-6 space-y-4 w-[380px] h-[250px]">
                    <h3 className="text-xl font-semibold text-gray-800">Chat</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Message..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <h1>sending to : {sendername}</h1>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>
                {/* Food Post Area */}
                <div className=" space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {loading ? (
                        <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : foods.length === 0 ? (
                        <p className="text-center text-gray-600">No food posts available</p>
                    ) : (
                        foods.map((food) => (
                            <div
                                key={food._id}
                                className="relative border bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                {/* Seller Info */}
                                {food.soldby.map((user) => (
                                    <div key={user._id} className="relative flex items-center gap-3 mb-2">
                                        <img
                                            src={`http://localhost:3000/profilepics/${user.image}`}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full border-2 border-blue-500 cursor-pointer"
                                            onClick={(e) => getid(e, user._id, user.name)}
                                        />
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-gray-500">{new Date(food.createdAt).toDateString()}</p>
                                        </div>
                                        <hr className="border-[1px] border-black w-full absolute top-[55px]"/>
                                    </div>
                                ))}

                                {/* Food Info */}
                                <h3 className="text-xl font-semibold text-gray-900 mt-[20px]">{food.foodName}</h3>
                                <p className="text-gray-700 mb-2">{food.description}</p>
                                <ul className="relative text-sm text-gray-600 space-y-1 mb-4">
                                    <li><strong>Price:</strong> ${food.price}</li>
                                    <li><strong>Location:</strong> {food.location}</li>
                                    <li><strong>Quantity:</strong> {food.quantity}</li>
                                    <li><strong>Expiry Date:</strong> {new Date(food.expiryDate).toDateString()}</li>
                                    <img src={`http://localhost:3000/sellimages/${food.image}`} alt="" className="absolute w-[230px] h-[210px] top-[-60px] left-[290px]"/>
                                </ul>
                                {/* Comment Button */}
                                <label
                                    htmlFor={`comments-${food._id}`}
                                    onClick={() => commentsbyid(food._id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
                                >
                                    <FaCommentDots /> Comment
                                </label>

                                {/* Hidden Checkbox for Modal Toggle */}
                                <input type="checkbox" id={`comments-${food._id}`} className="modal-toggle hidden" />

                                {/* Modal */}
                                <div className="modal w-full h-full flex items-center justify-center">
                                    <div className="modal-box w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                                        {food.soldby.map((user) => {
                                            return <strong> Comment on  {user.name}'s post</strong>
                                        })}
                                        <h3 className="text-xl font-bold mb-4"></h3>
                                        {allcommentsbyid.length === 0 ? (
                                            <p className="text-gray-600 text-center">No comments yet</p>
                                        ) : (
                                            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                                                {allcommentsbyid.map((com) => (
                                                    <div key={com._id} className="p-3 border rounded-md bg-gray-100">
                                                        <p className="text-sm font-semibold text-gray-800">{com.userComment.email}</p>
                                                        <p className="text-gray-700">{com.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <textarea
                                            className="w-full border rounded-md p-2 resize-none mb-4"
                                            placeholder="Write your comment..."
                                            onChange={(e) => changecomment(e, food._id)}
                                            value={comments[food._id] || ""}
                                            name="comments"
                                        />
                                        <div className="flex justify-between">
                                            <button
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                                onClick={(e) => submitcomment(e, food._id)}
                                            >
                                                Post Comment
                                            </button>
                                            <label
                                                htmlFor={`comments-${food._id}`}
                                                className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer hover:bg-gray-500"
                                            >
                                                Close
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* {Modal / comment Area} */}


            </div>
        </div>
    );

}
