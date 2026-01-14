const helper = require("../helper");
const { Author, Book } = require("../models");
const { Op } = require("sequelize");
class Controller {
    static async readAuthors(req, res) {
        try {
            const { q } = req.query;
            let where = {};
            if (q) {
                where.name = {
                    [Op.iLike]: `%${q}%`,
                };
            }

            const authors = await Author.getAuthorsWithTotalBooks(where);
            res.render("authors", { authors, q });
        } catch (error) {
            console.log(error);
        }
    }

    static async readBooks(req, res) {
        try {
            const { success, display } = req.query;
            const { q } = req.query;
            let where = { stock: { [Op.gt]: 0 } };

            if (q) {
                where.title = {
                    [Op.iLike]: `%${q}%`,
                };
            }

            console.log(where, "<<<<<<<<<<<<<<<<<<<<<<< query");
            const books = await Book.findAll({
                where,
                include: {
                    model: Author,
                    attributes: ["name"],
                },
                order: [["title", "ASC"]],
            });
            // res.send(books);
            res.render("books", {
                books,
                success,
                display,
                mode: "available",
                q,
            });
        } catch (error) {
            res.send(error);
        }
    }
    static async readEmtyBooks(req, res) {
        try {
            const { success, display } = req.query;

            const { q } = req.query;
            let where = { stock: 0 };

            if (q) {
                where.title = {
                    [Op.iLike]: `%${q}%`,
                };
            }
            const books = await Book.findAll({
                where,
                include: {
                    model: Author,
                    attributes: ["name"],
                },
                order: [["title", "ASC"]],
            });
            // res.send(books);
            res.render("books", { books, success, display, mode: "empty", q });
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
            // const book = await Book.findByPk(id);
            // const currentStock = book.stock;

            //* decrement with static Method
            const buy = await Book.decrement(
                { stock: 1 },
                {
                    where: { id, stock: { [Op.gt]: 0 } },
                }
            );
            // buy[0][1] : jumlah row yang ter-update
            [[affectedRow, count]] = buy;

            if (count === 0) {
                throw new Error("Out if stock");
            }
            // const cuurentStock = affectedRow[0].stock;

            res.redirect("/books");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showForm(req, res) {
        try {
            const { id } = req.params;
            let book = {};
            let authors = await Author.findAll();
            let action = `/books/add`;
            let isEdit = false;

            if (id) {
                book = await Book.findByPk(id);
                action = `/books/edit/${id}`;
                isEdit = true;
            }
            res.render("show-form", {
                book,
                authors,
                action,
                isEdit,
                errors: {},
            });
        } catch (error) {
            res.send(error);
        }
    }
    static async postAddBook(req, res) {
        try {
            const { title, isbn, stock, price, AuthorId } = req.body;
            const payload = { title, isbn, stock, price, AuthorId };
            await Book.create(payload);
            res.redirect(
                "/books?success=Data added successfully&display=success"
            );
        } catch (error) {
            const errors = helper.formatValdiateErrors(error);
            if (errors) {
                let authors = await Author.findAll();
                return res.render("show-form", {
                    book: req.body,
                    authors,
                    action: `/books/add`,
                    isEdit: false,
                    errors,
                });
            }
            res.send(error);
        }
    }
    static async postEdit(req, res) {
        const { id } = req.params;
        try {
            const { title, isbn, stock, price, AuthorId } = req.body;
            const payload = { title, isbn, stock, price, AuthorId };
            await Book.update(payload, {
                where: { id },
            });
            res.redirect(
                "/books?success=Data updated successfully&display=info"
            );
        } catch (error) {
            const errors = helper.formatValdiateErrors(error);
            if (errors) {
                let authors = await Author.findAll();
                return res.render("show-form", {
                    book: req.body,
                    authors,
                    action: `/books/edit/${id}`,
                    isEdit: false,
                    errors,
                });
            }
            res.send(error);
        }
    }
    static async postRestock(req, res) {
        try {
            const { stock } = req.body;
            const { id } = req.params;
            await Book.increment({ stock }, { where: { id } });
            res.redirect(
                `/books/emptyList?success=Data stock is updated&display=info`
            );
        } catch (error) {
            res.send(error);
        }
    }
    static async deleteBook(req, res) {
        try {
            const { id } = req.params;
            const foundBook = await Book.findByPk(id);
            if (!foundBook) throw new Error(`Data not found!`);
            await foundBook.destroy();
            res.redirect(
                `/books/emptyList?success=${foundBook.title} book is deleted&display=danger`
            );
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;
