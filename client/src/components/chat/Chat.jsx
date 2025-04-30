import React, { useEffect, useMemo, useState, useContext } from 'react'
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
        socket.on('welcome', (s) => {
            console.log(s)
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
        return () => {
            socket.disconnect()
        }
    }, [socket, userdata.user?._id])
    return (
        <div>
            <p> my id : {userdata.user?._id}</p> <br />
            <div className="border p-2 w-[250px]">
                <h2>Chatted User IDs:</h2>
                {chatUsers.map((id) => (
                    <p key={id} onClick={(e) => sendid(e, id)}>{id}</p>
                ))}
            </div> <br />
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
            </form>
            <div className='flex flex-col overflow-y-auto w-[250px] h-[250px]'>
                {showmsg.map((item, i) => (
                    <p key={i}> {item.msg}</p>
                ))}
            </div>



        </div>
    )
}
