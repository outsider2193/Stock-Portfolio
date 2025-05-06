const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/AuthRoutes");
const companyRoutes = require("./routes/companyRoutes");
const stockRoutes = require("./routes/stockRoutes");
const portfolioRoutes = require("./routes/portfolioRoute");
const adminRoutes = require("./routes/adminRoutes");
const overviewRoutes = require("./routes/overviewRoutes");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/stocks", stockRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/admin", adminRoutes);
app.use("/api", overviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
