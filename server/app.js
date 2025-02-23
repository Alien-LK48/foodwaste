import express, { json } from 'express'
import { config } from 'dotenv'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import connectToDb from './db/dbconnection.js'
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { adminRouter } from './routes/adminRoute.js'
const app = express()
config({ path: "./config.env" })

app.use(cors({
    origin: [process.env.FONTENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectToDb()

app.get('/', (req, res) => { res.send(`connected to express`) })
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)

export default app