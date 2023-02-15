require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const createError = require("http-errors");
const barangRouter = require("./src/routes/barang");
const userRouter = require("./src/routes/user");
const app = express();
const port = process.env.PORT;

const database = require("./src/config/db");
app.use(
  cors({
    origin: "*",
  })
);
app.use("/img", express.static("./upload"));
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/barang", barangRouter);

app.get("/", (req, res) => {
  res.send(database);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
