import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    msg: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Chatmodel= mongoose.model("chat", messageSchema);

export default Chatmodel