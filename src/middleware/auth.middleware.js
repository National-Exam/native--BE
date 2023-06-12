import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const checker = async (req, res, next) => {
  const token = req.headers.bearer;

  try {
    if (!token) {
      throw new Error("No token sent");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

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
