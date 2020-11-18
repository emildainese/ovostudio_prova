const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db/database");

//Preparare un project config per i prossimi progetti
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "download"))); //Non credo sia una buona prassi
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", require("./routes/companyRoutes"));
app.use("/api", require("./routes/studioRoutes"));
app.use(notFound, errorHandler);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
