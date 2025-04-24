import React, { useEffect, useState, useContext } from "react";
import { Appcontent } from "../../components/contextapi/Appcontext";
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function MyPost() {
    const { userdata } = useContext(Appcontent);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userdata?.user?.donatedFoods) {
            setPosts(userdata.user.saleFoods);
        } else {
            console.error("Failed to get data:", userdata);
        }
    }, [userdata]);

    const deleteit = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.delete('http://localhost:3000/api/user/deletepost', {
                data: { id }
            });

            if (data.success) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
            } else {
                console.error("Failed to delete post:", data.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            {posts.length === 0 ? (
                <p className="text-gray-600 text-center">no data</p>
            ) : (
                <div className="flex flex-col w-[400px] h-[470px] overflow-y-auto ml-[550px]">
                    {posts.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white shadow-md rounded-2xl my-[20px] p-4 border-2 border-blue-500"
                        >
                            <div className="dropdown dropdown-start">
                                <div tabIndex={0} className="ml-[320px] mt-[-5px] bg-[white]">
                                    <TiThMenuOutline className="text-lg" />
                                </div>
                                <ul tabIndex={0} className="menu ml-[200px] dropdown-content bg-base-100 rounded-box z-1 w-[90px] p-2 shadow-sm border-2 border-black">
                                    <li>
                                        <Link to={`/updatepost/${food._id}`} className="bg-blue-500 font-bold">edit</Link>
                                    </li><hr /><hr />
                                    <li>
                                        <button onClick={() => deleteit(food._id)} className="bg-blue-500 font-bold">delete</button>

                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-row gap-[10px] relative">
                                <img
                                    src="/logo.jpeg"
                                    alt=""
                                    className="w-[30px] h-[30px] rounded-full"
                                />
                                <h1 className="text-2xl">{food.foodName}</h1>
                            </div>
                            <p className="ml-[40px] text-sm">{new Date(food.createdAt).toLocaleDateString()}</p>
                            <br />
                            <p>{food.description}</p>
                            <br />
                            <img
                                src={`http://localhost:3000/sellimages/${food.image}`}
                                alt=""
                                className="w-[250px] h-[190px] ml-[45px]"
                            />
                            <br />
                            <div className="flex flex-col">
                                Quantity: {food.quantity} <br />
                                Price: {food.price} <br />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
