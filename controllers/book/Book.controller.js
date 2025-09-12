const BookModel = require("../../models/book");
const { generateSequentialBookId } = require("../../utils/Helpers");
const ResponseMessages = require("../../utils/ResponseMessages");


const AddBook = async (req, res) => {
    try {
        const { userid } = req.params;
        const bookData = req.body;
        const bookid = await generateSequentialBookId();
        const Savedbook = await BookModel({
            userid,
            bookid,
            ...bookData
        });
        const book = await Savedbook.save();
            
         return res.status(ResponseMessages.ADD_BOOK.statusCode).json({
  ...ResponseMessages.ADD_BOOK,
  book,
});
    } catch (error) {
        console.error("addBook error:", error);
        return res.status(ResponseMessages.SERVER_ERROR.statusCode)
                  .json(ResponseMessages.SERVER_ERROR);
    }
};

module.exports = { AddBook };