const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserLikes,
} = require("../controllers/userController")

const { protect } = require("../middleWare/authMiddleWare");
const protectAdmin = require("../middleWare/adminAuthMiddleWare");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUser);
router.get("/", protectAdmin, getAllUsers);
router.delete("/:id", protectAdmin, deleteUser);
router.get("/:id/likes", protect, getUserLikes);

module.exports = router;