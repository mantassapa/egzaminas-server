require("dotenv").config();
const express = require("express");
const connectToDB = require("./config.js")
const cors = require("cors");
const errorHandler = require("./middleWare/errorHandler.js")

connectToDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options("*");
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/ads", require("./routes/adRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);