const router = require("express").Router();
const { check } = require("express-validator");

const { getBooksController, getBookByIdController, addBookController, updateBookController }
    = require("../controllers/booksController");

router.get("/", getBooksController);

router.post("/", [
    // check("title", "Title is required").not().isEmpty(),
    // check("author", "Author is required").not().isEmpty(),
    // check("genre", "Genre is required").not().isEmpty(),
    // check("price", "Price is required").not().isEmpty(),
], addBookController);

router.put("/:id", updateBookController);

router.get("/:id", getBookByIdController);

module.exports = router;