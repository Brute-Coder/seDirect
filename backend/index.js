const express = require("express");
const dbConnect = require("./db");
const cors = require("cors");
const app = express();
dbConnect();

// middlewares in server
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("X-author", "soumya");
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", require("./routes/url.route"));

app.listen(4000, () => {
  console.log(" app listening on 4000");
});
