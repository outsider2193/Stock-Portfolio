const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, contactNumber, jobType, annualIncome, role = "user" } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      contactNumber,
      jobType,
      annualIncome,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating account", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });

    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      secretKey,
      { expiresIn: '1y' }
    );
    res.status(200).json({ message: "Login succesfull", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }

}
