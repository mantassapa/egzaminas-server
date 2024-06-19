const express = require("express");
const router = express.Router();
const {
  createAd,
  deleteAd,
  updateAd,
  getAllAds,
  getUserAds,
  likeAd,
} = require("../controllers/adController");
const { protect } = require("../middleWare/authMiddleWare");

router.post("/", protect, createAd);
router.delete("/:id", protect, deleteAd);
router.put("/:id", protect, updateAd);
router.get("/", getAllAds);
router.get("/my", protect, getUserAds);
router.post("/:id/like", protect, likeAd);

module.exports = router;