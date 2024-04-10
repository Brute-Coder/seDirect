const mongoose = require("mongoose");
require("dotenv").config();
const db = "seDirect" || process.env.dbName;
//const uri = process.env.domainEnv || "mongodb://127.0.0.1:27017/";
const uri =
  "mongodb+srv://soumyasekhar:SaDGr80ZypEIrLtY@cluster0.vpwi4vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(uri);
//"" ||
function connectDB() {
  mongoose
    .connect(`${uri}${db}`)
    .then(() => {
      console.log(`mongoDB connected at ${uri} and database is ${db}`);
    })
    .catch((err) => {
      console.log("error while connecting to mongoDB", err);
    });
}

module.exports = connectDB;

//SaDGr80ZypEIrLtY

//mongodb+srv://soumyasekhar:<password>@cluster0.vpwi4vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
