const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const wrapAsync = require("../utils/wrapAsync");
const {
  validateBook,
  authenticateToken,
  isOwner,
} = require("../utils/middleware");

// all books
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allBook = await Book.find({});
    res.status(200).json(allBook);
  }),
);

// particular book
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
        select: "username",
      },
    });
    res.status(200).json(book);
  }),
);

router.post(
  "/",
  authenticateToken,
  validateBook,
  wrapAsync(async (req, res) => {
    const newBook = new Book({ ...req.body.book });
    newBook.owner = req.currUser.id;
    await newBook.save();
    res.status(200).json({ msg: "Book Saved" });
  }),
);

// updating the book
router.put(
  "/:id/",
  authenticateToken,
  isOwner,
  validateBook,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, { ...req.body.book });
    res.status(200).json({ msg: "Book Updated" });
  }),
);

// delete a book
router.delete(
  "/:id",
  authenticateToken,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ msg: "Book Deleted" });
  }),
);

module.exports = router;
