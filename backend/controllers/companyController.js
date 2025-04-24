const Company = require("../models/companyModel");

const addCompany = async (req, res) => {
    try {
        const { name, sector, status, stockPrice, marketCap, yearlyGrowth } = req.body;

        const companyInfo = new Company({
            name,
            sector,
            status,
            stockPrice,
            marketCap,
            yearlyGrowth
        });

        await companyInfo.save();
        res.status(201).json({ message: "Company info added " })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { addCompany }



