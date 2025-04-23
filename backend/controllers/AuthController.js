const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, contactNumber, jobType, annualIncome } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      contactNumber,
      jobType,
      annualIncome
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating account", error: error.message });
  }
};
