const { Author, Book } = require("../models");
const { Op } = require("sequelize");
class Controller {
    static async readAuthors(req, res) {
        try {
            const authors = await Author.getAuthorsWithTotalBooks();
            res.render("authors", { authors });
        } catch (error) {
            console.log(error);
        }
    }

    static async readBooks(req, res) {
        try {
            const books = await Book.findAll({
                include: {
                    model: Author,
                    attributes: ["name"],
                },
                order: [["title", "ASC"]],
            });
            // res.send(books);
            res.render("books", { books });
        } catch (error) {
            res.send(error);
        }
    }
    static async readEmtyBooks(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async buyBook(req, res) {
        try {
            const { id } = req.params;
            //* decrement with instance method
            // const book = await Book.findByPk(id);
            // if (!book || book < 0) throw new Error("Stock sold out");
            // await book.decrement("stock", { by: 1 });

            //* decrement with static Method
            const buy = await Book.decrement(
                { stock: 1 },
                {
                    where: { id, stock: { [Op.gt]: 0 } },
                    returning: false, //tidak mengembalikan row data yang di update
                }
            );
            //buy[0][1] : jumlah row yang ter-update
            if (buy[0][1] === 0) {
                throw new Error("Out if stock");
            }

            res.redirect("/books");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showFormAdd(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async postAddBook(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async showFormRestock(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async postRestock(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
    static async deleteBook(req, res) {
        try {
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
