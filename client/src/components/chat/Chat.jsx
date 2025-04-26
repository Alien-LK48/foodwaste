import React, { useEffect, useMemo, useState, useContext } from 'react'
import { io } from 'socket.io-client'
import { Appcontent } from '../contextapi/Appcontext'

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

        return () => {
            socket.disconnect()
        }
    }, [socket])

    const submit = (e) => {
        e.preventDefault()
        if (!socket) return
        socket.emit('message', {
            msg,
            sendto,
            from: userdata.user.name
        })
        setMsg(``)
    }

    return (
        <div>
            {userdata.user?._id} <br />
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
                /> <br /><br />
                <button type='submit'>Send</button>
            </form>

            <br /><br /><br /><br />
            <div>
                {showmsg.map((item, i) => (
                    <p key={i}><b>{item.from}</b>: {item.msg}</p>
                ))}
            </div>
        </div>
    )
}
