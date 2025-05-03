import app from './app.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import Chatmodel from './models/chatmodel.js'
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FONTENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
})

const userSocketMap = {}  // userId to socketId

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    if (userId) {
        userSocketMap[userId] = socket.id
    }

    socket.on('message', async ({ sendto, msg, from, name }) => {
        try {
            await Chatmodel.create({
                from,
                to: sendto,
                msg
            })
            const targetSocketId = userSocketMap[sendto]
            if (targetSocketId) {
                io.to(targetSocketId).emit('receivedMsg', { msg, from, name })
            }

        } catch (error) {
            console.error("Error saving message:", error);
        }

    })

    // socket.on('disconnect', () => {
    //     console.log(`User ${userId} disconnected`)
    //     if (userId) {
    //         delete userSocketMap[userId]
    //     }
    // })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})
