require("dotenv").config();
require("./database/connect")();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/products", require("./routes/product"));
app.use("/api/v1/users", require("./routes/user"));

app.get("/", (req, res, next) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
