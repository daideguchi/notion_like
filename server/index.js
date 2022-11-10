const express = require("express");
const mongoose = require("mongoose");
// const { response } = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));

//localhost:3000/api/v1/register

// app.get("/", (req, res) => {
//     res.send("Hello Express")
// });

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中");
} catch (error) {
  console.log(error);
}



app.listen(PORT, () => {
  console.log(`ローカルサーバー起動中`);
});
