const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser)
      return res
        .status(404)
        .json({ message: "user already exist , please login" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPass,
      role,
    });

    await newUser.save();

    res.status(200).json({ message: " registered successfully " });
  } catch (err) {
    res.status(500).json({ message: "error while registering" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      res.status(404).json({ message: "user not found please register" });

    const pass = await bcrypt.compare(password, existingUser.password);
    if (!pass) res.status(404).json({ message: "password incorrect" });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, role: existingUser.role });
  } catch (err) {
    res
      .status(500)
      .json({ message: "erroe logging in , please try again later", err });
  }
});

const middleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


router.get("/admin", middleware, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  res.json({ message: "Welcome to the admin page" });
});



router.get("/user" , middleware , (req,res) => {
  if(req.user.role !== "user")  return res.status(403).json({ message: "Access denied" });

  res.json({message : "welcome to the user page"})
})

module.exports = router;
