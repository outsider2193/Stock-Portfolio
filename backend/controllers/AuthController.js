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
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        contactNumber: existingUser.contactNumber,
        gender: existingUser.gender,
        jobType: existingUser.jobType,
        annualIncome: existingUser.annualIncome
      },
      secretKey,
      { expiresIn: '1y' }
    );
    
    res.status(200).json({ message: "Login succesfull", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUsersById = async (req, res) => {
  const { id } = req.params;
  try {
      const particularUser = await User.findById(id);
      if (!particularUser) {
          res.status(404).json({ message: "Not found" })
      }
      res.status(200).json({ message: "User fetched succesfully", data: particularUser })
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateuserProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, contactNumber, gender, jobType, annualIncome } = req.body;
  try {

      const updateDetails = await User.findByIdAndUpdate(id, { firstName, lastName, email, contactNumber, gender, jobType, annualIncome }, { new: true });
      if (!updateDetails) {
          res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Details updated succesfully", data: updateDetails })
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server error" });
  }
};

exports.updateuserPassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
      const existingUser = await User.findById(id);
      if (!existingUser) return res.status(404).json({ message: "Not found" })

      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isMatch) return res.status(404).json({ message: "Current password is wrong" });
      if (confirmPassword !== newPassword) {
          return res.status(400).json({ message: "Incorrect password" })
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatePassword = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

      res.status(200).json({ message: "Password updated", data: updatePassword });


  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
  }
};
