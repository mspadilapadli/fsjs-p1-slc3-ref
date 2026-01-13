const { Author, Book } = require("../models");
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
        } catch (error) {
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
