const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  return res.send("Home Page");
});

app.get("/login", (req, res) => {
  return res.send("You are visiting a login route");
});
app.get("/signup", (req, res) => {
  return res.send("You are visiting signup route");
});

const admin = (req, res) => {
  return res.send("this is admin dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("Admin is running");
  next();
};

const isloggedIn = (req, res, next) => {
  console.log("you are logged in, and good to go...")
  next();
};

app.get("/admin", isloggedIn, isAdmin, admin);

app.get("/signout", (req, res) => {
  return res.send("You are signed out");
});

app.get("/shubhranshu", (req, res) => {
  return res.send("Shubhranshu uses Instagram");
});

app.listen(port, () => {
  console.log("Server is up and running...");
});