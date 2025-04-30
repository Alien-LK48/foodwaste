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
    const getid = (e, id) => {
        e.preventDefault()
        setSendto(id)
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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">All Food Posts</h2>
            <p>{userdata.user?._id}</p>


            <div className="flex flex-row">
                <div>
                    <form onSubmit={submit}>
                        <input
                            type="text"
                            placeholder='Message...'
                            className='border-2 border-[red]'
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        /> <br /><br />
                        <input
                            type="text"
                            placeholder='Send to (user id)...'
                            className='border-2 border-[red]'
                            value={sendto}
                            onChange={(e) => setSendto(e.target.value)}
                            required
                        /> <br /><br />
                        <button type='submit'>Send</button>
                    </form> <br /><br />
                    <div>
                        {showmsg.map((item, i) => (
                            <p key={i}><b>{item.name}</b>: {item.msg}</p>
                        ))}
                    </div>
                </div>
                <div>
                    {loading ? (
                        <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : foods.length === 0 ? (
                        <p className="text-center text-gray-600">No food posts available</p>
                    ) : (
                        <div className="flex flex-col w-[400px] h-[470px] overflow-y-auto ml-[450px] gap-6">
                            {foods.map((food) => (
                                <div key={food._id} className="relative border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
                                    <section>{food.soldby.map((user) => {
                                        return <div key={user._id}>
                                            <div className="flex flex-row gap-[15px]">
                                                <img src={`http://localhost:3000/profilepics/${user.image}`}
                                                    alt="?"
                                                    className="w-[50px] h-[50px] rounded-full border-red-600 border-2"
                                                    onClick={(e) => getid(e, user._id)} />
                                                <p className="mt-[5px]">{user.name}</p>
                                            </div>
                                        </div>
                                    })}</section>
                                    <p className="absolute top-[55px] text-sm left-[90px]">{new Date(food.createdAt).toDateString()}</p> <br />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{food.foodName}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                                    <p><strong>Price:</strong> ${food.price}</p>
                                    <p><strong>Location:</strong> {food.location}</p>
                                    <p><strong>Quantity:</strong> {food.quantity}</p>
                                    <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toDateString()}</p>

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
                                                            <p className="text-sm font-semibold text-gray-800">{com.userComment.email}</p>
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
            </div>






        </div>
    );
}
