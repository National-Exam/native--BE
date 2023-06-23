import mongoose from "mongoose";
const enumValues = ["USED", "NEW", "EXPIRED"];
const purchaseTokensSchema = new mongoose.Schema({
   id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString().slice(0, 11)
  },
  meter_number: {
    type: String,
    required: true,
    minLength:[6, "The meter number cannot be more than 6"]
  },
  token: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 8,
  },
  token_status: {
    type: String,
    enum: enumValues,
    required: true,
    default: "NEW",
  },
  token_value_days: {
    type: String,
    required: true,
  },
  purchased_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    minlength: [11, "Number field must have a minimum length of 11"],
  },  
});

const PurchasedToken = mongoose.model("Purchased_token", purchaseTokensSchema);

export default PurchasedToken;
