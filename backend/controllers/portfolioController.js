const Portfolio = require("../models/portfolioModel");
const User = require("../models/UserModel")

const createPortfolio = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const existingPortfolio = await Portfolio.findOne({ userId: id });
        if (existingPortfolio) {
            return res.status(400).json({ message: "Portfolio already created" })
        }

        const userPortfolio = new Portfolio({
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
const getPortfolio = async (req, res) => {
    const { userId } = req.params;

    try {
        const userPortfolio = await Portfolio.findOne({ userId }).populate("stocks");

        if (!userPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        res.status(200).json({ data: userPortfolio });
    } catch (error) {
        console.error("Error fetching portfolio:", error.message);
        res.status(500).json({ error: "Failed to fetch portfolio" });
    }
};

module.exports = { createPortfolio, getPortfolio }