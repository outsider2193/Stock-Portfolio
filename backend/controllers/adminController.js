const User = require("../models/UserModel");
const Transaction = require("../models/transactionModel");


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "User deleted succesfully", deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllusers = async (req, res) => {

  try {
      const allUsers = await User.find();
      if (!allUsers) {
          return res.status(404).json({ message: "No users found" })
      }
      res.status(200).json({ message: "Users fetched ", data: allUsers })
  } catch (error) {
      console.log(error);
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("portfolio");
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};


module.exports = { deleteUser, getAllusers, getAllTransactions };