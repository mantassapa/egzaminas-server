const express = require("express");
const router = express.Router();
const { createComment, deleteComment } = require("../controllers/commentController");
const { protect } = require("../middleWare/authMiddleWare");

router.post("/", protect, createComment);
router.delete("/:id", protect, deleteComment);


module.exports = router;