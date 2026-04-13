const express = require("express");
const router = express.Router({mergeParams : true});
const Book = require("../models/book");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview , authenticateToken , isReviewAuthor } = require("../utils/middleware");

router.post(
  "/",
  authenticateToken , 
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateBook = await Book.findById(id);
    const newReview = new Review({ ...req.body.review });
    newReview.author = req.currUser.id;
    await newReview.save();
    updateBook.reviews.push(newReview);
    await updateBook.save();
    res.status(200).json({msg : "Review Saved" , author : req.currUser.username , review : newReview});
  }),
);

router.delete(
  "/:reviewId",
  authenticateToken , 
  isReviewAuthor ,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({msg : "Review Deleted"});
  }),
);

module.exports = router;