import mongoose from 'mongoose';

const SellFoodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, required: true },
    expiryDate: { type: Date },
    soldby: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const SellFoodModel = mongoose.model('sellfoods', SellFoodSchema);
export default SellFoodModel;
