const asyncHandler = require("express-async-handler");
const Ad = require("../models/adModel");
const Category = require("../models/categoryModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");


const createAd = asyncHandler(async (req, res) => {
  const { name, category, price, description, images } = req.body;


  const categoryObj = await Category.findOne({ name: category });

  if (!categoryObj) {
    res.status(400);
    throw new Error("Category not found");
  }


  const ad = await Ad.create({
    name,
    category: categoryObj._id,
    price,
    description,
    user: req.user._id,
    images,
  });

  res.status(201).json(ad);
});


const deleteAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;


  const ad = await Ad.findById(adId);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }



  try {

    await Comment.deleteMany({ ad: adId });


    await Ad.findByIdAndDelete(adId);

    res.json({ message: "Ad removed successfully" });
  } catch (error) {
    console.error("Error while deleting ad:", error);
    res
      .status(500)
      .json({ message: "Error while deleting ad", error: error.message });
  }
});


const updateAd = asyncHandler(async (req, res) => {
  const { name, category, price, description, images } = req.body;

  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }


  ad.name = name;
  ad.category = category;
  ad.price = price;
  ad.description = description;
  ad.images = images;

  const updatedAd = await ad.save();
  res.json(updatedAd);
});

const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find()
    .populate("category")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    });

  res.json(ads);
});


const likeAd = asyncHandler(async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    if (!ad.likes.includes(req.user._id)) {
      ad.likes.push(req.user._id);
      await ad.save();

      const user = await User.findById(req.user._id);
      user.likes.push(ad._id);
      await user.save();

      res.status(200).send("Ad liked");
    } else {
      res.status(400).send("You have already liked this ad");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


const getUserAds = asyncHandler(async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user._id }).populate("category");
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = {
  createAd,
  deleteAd,
  updateAd,
  getAllAds,
  getUserAds,
  likeAd,
};