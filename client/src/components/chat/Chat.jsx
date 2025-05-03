import React, { useEffect, useMemo, useState, useContext, useRef } from 'react'
import { io } from 'socket.io-client'
import { Appcontent } from '../contextapi/Appcontext'
import axios from 'axios'

export default function Chat() {
    const { userdata } = useContext(Appcontent)

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
    const [chatUsers, setChatUsers] = useState([]);
    const msgEndRef = useRef(null)
    const submit = (e) => {
        e.preventDefault()
        if (!socket) return
        socket.emit('message', {
            msg,
            sendto,
            from: userdata.user._id,
            name: userdata.user.name,
        })
        setShowmsg((prev) => [...prev, { msg, name: "You" }])
        setMsg(``)
    }

    const fetchChatUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/getChatUsers/${userdata.user._id}`);
            if (res.data.success) {
                setChatUsers(res.data.users);
            }
        } catch (err) {
            console.error("Error fetching chat users", err);
        }
    };

    const sendid = async (e, receiverId) => {
        e.preventDefault();
        setSendto(receiverId);
        try {
            const res = await axios.get(`http://localhost:3000/api/user/getMessages/${userdata.user._id}`);
            if (res.data.success) {
                const filteredMsgs = res.data.messages.filter(
                    m =>
                        (m.from === userdata.user._id && m.to === receiverId) ||
                        (m.from === receiverId && m.to === userdata.user._id)
                ).map(m => ({
                    msg: m.msg,
                    name: m.from === userdata.user._id ? "You" : m.name || "User"
                }));
                setShowmsg(filteredMsgs);
            }
        } catch (err) {
            console.error("Failed to load chat with user", err);
        }
    };

    useEffect(() => {
        if (!socket) return

        socket.on('connect', () => {
            setId(socket.id)
            console.log('connected', socket.id)
        })

        socket.on('receivedMsg', (data) => {
            if (
                (data.from === userdata.user._id && data.sendto === sendto) ||
                (data.from === sendto && data.sendto === userdata.user._id)
            ) {
                setShowmsg((prev) => [...prev, data])
            }
        });

        if (userdata?.user?._id) {
            fetchChatUsers();
        }
        // return () => {
        //     socket.disconnect()
        // }
    }, [socket, userdata.user?._id, sendto])
    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [showmsg])

    return (
        <div className="flex h-[510px] w-full font-sans">
            {/* Sidebar with chat users */}
            <div className="w-1/4 border-r border-gray-300 p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Chats</h2>
                {chatUsers.map((user) => (
                    <div
                        key={user._id}
                        onClick={(e) => sendid(e, user._id)}
                        className="mb-4 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-400">{user.phone}</p>
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="w-3/4 flex flex-col">
                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                    {showmsg.map((message, i) => (
                        <div
                            key={i}
                            className={`mb-2 flex ${message.name === "You" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-xs ${message.name === "You"
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black border"
                                    }`}
                            >
                             {message.msg}
                            </div>
                        </div>
                    ))}
                    <div ref={msgEndRef}></div>
                </div>

                {/* Input Box */}
                <form onSubmit={submit} className="p-4 border-t flex gap-2 bg-white">
                    <input
                        type="text"
                        placeholder="Message..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    {/* <input
                        type="text"
                        placeholder="User ID"
                        className="w-[150px] border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={sendto}
                        onChange={(e) => setSendto(e.target.value)}
                        required
                    /> */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
