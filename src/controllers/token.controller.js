import PurchasedToken from "../models/purchase_tokens.model.js";
import { generateToken } from "../utils/generateToken.js";

// create a owner
export async function createToken(req, res) {
  try {
    // user payload
    const { meter_number,amount } = req.body;
    
    const {token,days} = generateToken(amount,meter_number);
    const data = {        
        token,
        amount,
        token_value_days: days,
        meter_number,        
    }
    console.log(data)
    // Create a new token
    const savedToken = await PurchasedToken.create({
      ...data
    });

    return res.status(201).json(savedToken);
  } catch (error) {
    console.error("Error creating token:", error);
    return res.status(500).send("Internal server error");
  }
}
// Get all tokens
export async function getAllTokens(req, res) {
  try {
    const tokens = await PurchasedToken.find();
    return res.status(200).json(tokens);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return res.status(500).send("Internal server error");
  }
}
// validate token
export async function validateToken(req, res) {
  try {
    const {meter_number} = req.body;
    const token = await PurchasedToken.findOne({meter_number});
    console.log(token, 'the token')
    return res.status(200).json(token);
  } catch (error) {
    console.error("Error fetching token:", error);
    return res.status(500).send("Internal server error");
  }
}

