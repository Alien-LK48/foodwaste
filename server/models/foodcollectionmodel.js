import mongoose from "mongoose";

const FoodCollectionSchema = new mongoose.Schema(
  {
    nameofOrg: { type: String, required: true },
    emailofOrg: { type: String, required: true },
    nameofReceiver: { type: String, required: true },
    emailofReceiver: { type: String, required: true },
    nameofDonor: { type: String, required: true },
    emailofDonor: { type: String, required: true },
    contactnumofDonor: { type: String, required: true },
    locationofDonor: { type: String, required: true },
    donatesFrom: { type: String, required: true },
    foodname: { type: String, required: true },
    quantity: { type: String, required: true },
    foodExpdate: { type: Date, required: true },
  },
  { timestamps: true }
)

const FoodCollectionModel = mongoose.model("foodcollections", FoodCollectionSchema);
export default FoodCollectionModel;
