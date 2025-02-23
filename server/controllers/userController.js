import FoodModel from "../models/foodmodel.js";
import usermodel from "../models/usermodel.js";
export const getuserdata = async (req, res) => {
    try {
        const { userid } = req.body
        const user = await usermodel.findById(userid).populate("donatedFoods");
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
        user.donatedFoods.push(savedFood._id);
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

        await FoodModel.findByIdAndDelete(foodId);
        await usermodel.updateOne(
            { donatedFoods: foodId },
            { $pull: { donatedFoods: foodId } }
        );

        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

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

