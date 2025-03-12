import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        food: { type: mongoose.Schema.Types.ObjectId, ref: "sellfoods", required: true },
        userComment:{ type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    },
    { timestamps: true }
);

const CommentModel = mongoose.model("comments", commentSchema);
export default CommentModel;
