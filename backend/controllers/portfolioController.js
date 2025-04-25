const portfolio = require("../models/portfolioModel");
const User = require("../models/UserModel")

const createPortfolio = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
           return  res.status(400).json({ message: "User not found" })
        }

        const existingPortfolio = await portfolio.findOne({ userId: id });
        if (existingPortfolio) {
           return res.status(400).json({ message: "Portfolio already created" })
        }

        const userPortfolio = new portfolio({
            userId: id,
            cash: 10000,
            stocks: []
        })
        await userPortfolio.save();
        user.portfolio = userPortfolio._id;
        await user.save();
        res.status(201).json({ message: "portfolio created:", data: userPortfolio })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }



}

module.exports = { createPortfolio }