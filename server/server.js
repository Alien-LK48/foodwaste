import app from './app.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

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

    console.log(`User ${userId} connected with socket id ${socket.id}`)

    socket.emit('welcome', `Welcome to server, ${socket.id}`)

    socket.broadcast.emit(`'welcome', ${socket.id} has joined the server)`)

    socket.on('message', ({ sendto, msg, from }) => {
        const targetSocketId = userSocketMap[sendto]
        if (targetSocketId) {
            io.to(targetSocketId).emit('receivedMsg', { msg, from })
        }
    })

    socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`)
        if (userId) {
            delete userSocketMap[userId]
        }
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})
