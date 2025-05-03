import FoodModel from "../models/foodmodel.js";
import SellFoodModel from "../models/sellfoodmodel.js";
import usermodel from "../models/usermodel.js";
import CommentModel from "../models/commentmodel.js";
import Chatmodel from "../models/chatmodel.js";
export const getuserdata = async (req, res) => {
    try {
        const { userid } = req.body
        const user = await usermodel.findById(userid).populate("donatedFoods").populate("saleFoods");
        if (!user) {
            return res.json({
                success: false,
                message: `user not found`
            })
        }
        res.json({
            success: true,
            message: `got user`,
            userData: {
                user: user,
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
export const donateFood = async (req, res) => {
    try {
        const { userid, name, description, quantity, location, expiryDate, donatesFrom, pickupTime } = req.body;
        if (!userid) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!name || !quantity || !location || !donatesFrom) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const user = await usermodel.findById(userid);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const food = new FoodModel({
            name,
            description,
            quantity,
            location,
            expiryDate,
            donatesFrom,
            pickupTime,
            user: userid,
        });
        const savedFood = await food.save();
        user.donatedFoods.push(savedFood._id)
        await user.save();
        res.status(201).json({ success: true, message: "Food posted successfully", food: savedFood });
    } catch (error) {
        console.error("Error posting food:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const alldonetedfoods = async (req, res) => {
    try {
        const foods = await FoodModel.find().populate("user").populate("receivedBy");

        if (!foods.length) {
            return res.status(404).json({ success: false, message: "No donated food found." });
        }

        res.status(200).json({
            success: true,
            message: `got all foods with users`,
            foods
        });
    } catch (error) {
        console.error("Error fetching donated foods:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteFood = async (req, res) => {
    try {
        const { foodId, userId } = req.params;

        const food = await FoodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        // await usermodel.updateOne(
        //     { donatedFoods: foodId },
        //     { $pull: { donatedFoods: foodId } }
        // );
        await FoodModel.findByIdAndDelete(foodId);
        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const receivefood = async (req, res) => {
    try {
        const { foodid, userid } = req.body;
        const food = await FoodModel.findById(foodid).populate("receivedBy");

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (food.receivedBy) {
            return res.status(400).json({
                success: false,
                message: "Already received",
                receivedBy: food.receivedBy.email
            });
        }

        food.isreceived = true;
        food.receivedBy = userid;
        await food.save();

        const receiver = await usermodel.findById(userid);

        res.status(200).json({
            success: true,
            message: "Food received successfully",
            food,
            receivedBy: receiver.email
        });
    } catch (error) {
        console.error("Error receiving food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const sellfood = async (req, res) => {
    try {
        const { userid, foodName, description, location, quantity, price, expiryDate } = req.body
        if (!userid) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await usermodel.findById(userid);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const imagePath = req.file?.filename;
        const food = new SellFoodModel({
            foodName,
            description,
            location,
            quantity,
            price,
            expiryDate,
            user: userid,
            soldby: userid,
            image: imagePath,
        });
        const savedFood = await food.save();
        user.saleFoods.push(savedFood._id)
        await user.save();
        res.status(201).json({ success: true, message: "Food posted successfully", food: savedFood });
    } catch (error) {
        console.error("Error selling foods:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const foodsellpost = async (req, res) => {
    try {
        const foods = await SellFoodModel.find().populate('soldby')
        if (!foods.length) {
            return res.status(404).json({ success: false, message: "No food found." });
        }
        res.status(200).json({
            success: true,
            message: `got all foods by sellers`,
            foods
        });
    } catch (error) {
        console.error("Error getting post:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getsellfoodsbyid = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        const fooddata = await SellFoodModel.findById(id);

        if (!fooddata) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({
            success: true,
            message: "Food item retrieved successfully",
            fooddata
        });

    } catch (error) {
        console.error("Could not fetch data", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const editmysell = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedFood = await SellFoodModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({ success: true, message: "Food updated successfully", food: updatedFood });
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const deletepost = async (req, res) => {
    try {
        const { id } = req.body
        const deletedFood = await SellFoodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const postComment = async (req, res) => {
    try {
        const { foodId, comment, userid } = req.body;
        console.log(foodId)
        console.log(comment)
        const food = await SellFoodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food post not found" });
        }
        const newComment = new CommentModel({
            comment,
            food: foodId,
            userComment: userid
        })
        await newComment.save();
        food.comments.push(newComment._id);
        await food.save();
        res.status(201).json({
            success: true,
            message: "Comment posted successfully",
            comment: newComment,
        });
    } catch (err) {
        console.error("Error posting comment:", err);
        res.status(500).json({ success: false, message: "Error posting comment", error: err.message });
    }
};

export const getcomments = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate("userComment");
        res.status(200).json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
export const getcommentsbyid = async (req, res) => {
    try {
        const { id } = req.params
        const comments = await CommentModel.find({ food: id }).populate("userComment");
        res.status(200).json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const getchats = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Chatmodel.find({
            $or: [{ from: userId }, { to: userId }]
        }).sort({ timestamp: 1 });

        res.json({ success: true, messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
}

export const getChatUsers = async (req, res) => {
    try {
        const { userId } = req.params;

        const chats = await Chatmodel.find({
            $or: [{ from: userId }, { to: userId }]
        });

        const userIdsSet = new Set();

        chats.forEach(chat => {
            if (chat.from.toString() !== userId) userIdsSet.add(chat.from.toString());
            if (chat.to.toString() !== userId) userIdsSet.add(chat.to.toString());
        });

        const userIds = Array.from(userIdsSet);

        // Fetch user details by IDs
        const users = await usermodel.find(
            { _id: { $in: userIds } },
            'name email image _id phone' // Only select these fields (adjust if needed)
        );

        res.json({ success: true, users });
    } catch (error) {
        console.error("Error getting chat users:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
