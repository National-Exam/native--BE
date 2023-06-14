import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const checker = async (req, res, next) => {
  const authHeader = req.headers.authorization;  
  try {
    if (!authHeader) {
      throw new Error("No token sent");
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header

    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ error: "Token expired" });
    } else {
      res.status(400).json({ error: error.message });
    }
    res.locals.user = null;
  }
};

export default checker;
