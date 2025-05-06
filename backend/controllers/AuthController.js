const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const sendWelcomeEmail = require("../middleware/mailMiddleware");

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
    await sendWelcomeEmail(newUser.email, newUser.firstName);
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.RESET_SECRET, { expiresIn: "15m" });

    // Create link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email options
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {
    // ✅ Decode the token directly
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset failed", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};