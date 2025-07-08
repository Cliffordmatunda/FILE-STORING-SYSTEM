import users from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("🔔 register() CALLED");
  const { name, email, password } = req.body;

  console.log("Registering new user:", { name, email });

  try {
    const userExists = await users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    //create new user
    const newUser = await users.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
      },
    });
  } catch (error) {
    console.error("Error registering new user,error");
    res.status(500).json({ message: "Internal server error" });
  }
};
//user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });
    if (user && (await users.matchPassword(password))) {
      res.status(200).json({
        message: "login successful",
        user: {
          id: user._id,
          email: user.email,
          userName: user.name,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(501), json({ message: "internal server error" });
  }
};
export default register;
