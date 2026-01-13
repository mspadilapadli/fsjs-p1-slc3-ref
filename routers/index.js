const router = require("express").Router();
const Controller = require("../controllers/controller");

//read
router.get("/", Controller.readBooks);
router.get("/authors", Controller.readAuthors);
router.get("/books", Controller.readBooks);
router.get("/books/emptyList", Controller.readEmtyBooks);

//buy book
router.get("/books/buy/:id", Controller.buyBook);

//add
router.get("/books/add", Controller.showFormAdd);
router.post("/books/add", Controller.postAddBook);

//edit
router.get("/books/restock/:id", Controller.showFormRestock);
router.post("/books/restock/:id", Controller.postRestock);

//delete
router.get("/books/delete/:id", Controller.deleteBook);

module.exports = router;
