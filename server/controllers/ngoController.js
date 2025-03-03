import FoodCollectionModel from '../models/foodcollectionmodel.js'
import usermodel from '../models/usermodel.js';
import FoodModel from '../models/foodmodel.js'
export const collectFood = async (req, res) => {
    
    try {
        const {
            userid,
            nameofOrg,
            emailofOrg,
            nameofReceiver,
            emailofReceiver,
            nameofDonor,
            emailofDonor,
            contactnumofDonor,
            locationofDonor,
            donatesFrom,
            foodname,
            quantity,
            foodExpdate,
        } = req.body;
        if (!userid) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        if (!nameofOrg || !emailofOrg || !nameofReceiver || !emailofReceiver ||
            !nameofDonor || !emailofDonor || !contactnumofDonor || !locationofDonor ||
            !donatesFrom || !foodname || !quantity || !foodExpdate) {
            return res.status(400).json({ success: false, message: "Missing required fields" })
        }
        const foodCollection = new FoodCollectionModel({
            nameofOrg,
            emailofOrg,
            nameofReceiver,
            emailofReceiver,
            nameofDonor,
            emailofDonor,
            contactnumofDonor,
            locationofDonor,
            donatesFrom,
            foodname,
            quantity,
            foodExpdate,
        })
        const savedCollection = await foodCollection.save()
        res.status(201).json({
            success: true,
            message: "Food collection recorded successfully",
            collection: savedCollection
        })
    } catch (error) {
        console.error("Error collecting food:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}