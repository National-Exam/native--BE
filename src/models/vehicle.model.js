import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  chasisNumber: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  mfgCompany: {
    type: String,
    required: true,
  },
  mfgYear: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
