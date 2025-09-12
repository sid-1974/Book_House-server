const BookModel = require("../models/book");
const UserModel = require("../models/user");

async function generateSequentialUserId() {
  try {
    const users = await UserModel.find({ userid: { $exists: true, $ne: null } }).sort({ userid: -1 });
    if (users.length === 0) {
      return "BHU0001";
    }
    let maxUserId = "BHU0000";
    for (const user of users) {
      if (user.userid && user.userid > maxUserId) {
        maxUserId = user.userid;
      }
    }
    const numericPart = parseInt(maxUserId.replace("BHU", ""), 10);
    const nextNumericPart = numericPart + 1;
    
    const nextUserId = "BHU" + nextNumericPart.toString().padStart(4, "0");
    
    return nextUserId;
  } catch (error) {
    console.error("Error generating user ID:", error);
    return "BHU" + Date.now().toString().slice(-4);
  }
}

async function generateSequentialBookId() {
  try {
    const books = await BookModel.find({ bookid: { $exists: true, $ne: null } }).sort({ bookid: -1 });
    if (books.length === 0) {
      return "BOOK0001";
    }
    let maxBookId = "BOOK0000";
    for (const book of books) {
      if (book.bookid && book.bookid > maxBookId) {
        maxBookId = book.bookid;
      }
    }
    const numericPart = parseInt(maxBookId.replace("BOOK", ""), 10);
    const nextNumericPart = numericPart + 1;
    
    const nextBookId = "BOOK" + nextNumericPart.toString().padStart(4, "0");
    
    return nextBookId;
  } catch (error) {
    console.error("Error generating book ID:", error);
    return "BOOK" + Date.now().toString().slice(-4);
  }
}
module.exports = { generateSequentialUserId, generateSequentialBookId };