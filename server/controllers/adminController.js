import FoodCollectionModel from '../models/foodcollectionmodel.js'
import usermodel from '../models/usermodel.js';
import FoodModel from '../models/foodmodel.js'

export const foodData = async (req, res) => {
    try {
        const foods = await FoodCollectionModel.find()
        if (!foods.length) {
            return res.status(404).json({ success: false, message: "No donated food found." });
        }
        const totalfoods = await FoodCollectionModel.countDocuments()
        res.status(200).json({
            success: true,
            message: `got all foods with users`,
            foods,
            totalfoods
        })
    } catch (error) {
        console.error("Error fetching donated foods:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const totalcount = async (req, res) => {
    try {
        const admins = await usermodel.countDocuments({ isAdmin: true })
        const ngos = await usermodel.countDocuments({ isNgo: true, isVarified: true })
        const donors = await usermodel.countDocuments({ isDonor: true })
        const users = await usermodel.countDocuments({ isUser: true })
        const ban = await usermodel.countDocuments({ isBanned: true })
        const totalfoods = await FoodCollectionModel.countDocuments()
        const ngoaccountnotverified = await usermodel.countDocuments({ isNgo: true, isVarified: false })
        res.status(200).json({
            success: true,
            message: `got all data`,
            admins,
            ngos,
            donors,
            users,
            ngoaccountnotverified,
            totalfoods,
            ban
        })
    } catch (error) {
        console.error("Error datas", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export const allaccounts = async (req, res) => {
    try {
        const users = await usermodel.find({ isAdmin: false })
        if (!users.length) {
            return res.status(404).json({ success: false, message: "No user." })
        }
        res.status(201).json({
            success: true,
            message: "got users",
            users
        })
    } catch (error) {
        console.error("Error datas", error)
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export const banAccount = async (req, res) => {
    try {
        const { id } = req.body;
        console.log("Request body:", req.body)
        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" })
        }
        console.log("Banning user with ID:", id)
        const user = await usermodel.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }
        if (user.role === "admin") {
            return res.status(403).json({ success: false, message: "Cannot ban admin accounts." })
        }
        user.isBanned = true
        await user.save()
        console.log("User banned:", user)
        res.status(200).json({ success: true, message: "User banned successfully.", user })
    } catch (error) {
        console.error("Error banning user:", error)
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export const UnbanAccount = async (req, res) => {
    try {
        const { id } = req.body
        console.log("Request body:", req.body)
        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" })
        }
        console.log("Banning user with ID:", id)
        const user = await usermodel.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }
        if (user.role === "admin") {
            return res.status(403).json({ success: false, message: "Cannot ban admin accounts." })
        }
        user.isBanned = false
        await user.save()
        console.log("User banned:", user)
        res.status(200).json({ success: true, message: "User banned successfully.", user })
    } catch (error) {
        console.error("Error banning user:", error)
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}
export const allngos = async (req, res) => {

    try {
        const ngos = await usermodel.find({ isNgo: true, isVarified: false })
        if (!ngos.length) {
            return res.status(404).json({ success: false, message: "No ngo found." })
        }
        res.status(201).json({
            success: true,
            message: "got ngos",
            ngos
        })
    } catch (error) {
        console.error("Error datas", error)
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}



