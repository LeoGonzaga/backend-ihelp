const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
mongoose.connect(
  "mongodb+srv://leogonzaga:bloodhelp@omnistack-ekd7k.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(bp.json());
app.use(express.json());
app.use(routes);

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`A NodeJS API is listining on port: ${port}`);
});
