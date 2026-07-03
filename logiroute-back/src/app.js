require("dotenv").config();
const express = require("express");
const cors = require("cors");

const logisticaRoutes = require("./routes/logisticaRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", logisticaRoutes);

module.exports = app;
