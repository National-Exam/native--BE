import mongoose from "mongoose";
const ownerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,    
  },
  phone: {
    type: String,    
  },
});


const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
