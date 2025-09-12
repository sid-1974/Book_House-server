const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    bookid: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    publisher: {
      type: String,
    },
    language: { 
      type: String,
    },
    pages: {
      type: Number,
    },
    year: {
      type: Number,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
    },
    share: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

const BookModel = mongoose.model("book_tbl", BookSchema);
module.exports = BookModel;   