
import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: String, required: true },
    location: { type: String, required: true },
    expiryDate: { type: Date },
    pickupTime: { type: String },
    isreceived: { type: Boolean, default: false },
    donatesFrom: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    
  },
  { timestamps: true }
);

const FoodModel = mongoose.model('foods', FoodSchema);
export default FoodModel;
