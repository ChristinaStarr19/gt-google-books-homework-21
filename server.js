const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("client/build"));

app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*"),
  (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  };

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfullyconnectedtodatabase.");
  })
  .catch((err) => {
    console.log("Unabletoconnecttodatabase.");
    console.log(err);
  });

app.listen(PORT, function () {
  console.log(`Expressserverisrunningonhttp://localhost:${PORT}!`);
});