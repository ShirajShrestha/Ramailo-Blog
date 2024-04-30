import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.json("Signup Successful");
  } catch (error) {
    return res.status(400).json({ message: "Username or Email already exist" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  const user = await User.findOne({ email });
  //compare hashed function
  if (user && (await bcryptjs.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res
      .status(200)
      .json({ message: "Login Successful", userId: user.id });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};

export const logout = (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};
