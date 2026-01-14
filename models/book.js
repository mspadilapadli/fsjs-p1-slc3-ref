"use strict";
const { Model } = require("sequelize");
const helper = require("../helper");
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.belongsTo(models.Author);
        }
        get formatePrice() {
            return helper.formatCurrency(this.price);
        }
    }
    Book.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Title cannot be null`,
                    },
                    notEmpty: {
                        msg: `Title is required`,
                    },
                },
            },
            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `ISBN cannot be null`,
                    },
                    notEmpty: {
                        msg: `ISBN is required`,
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Price cannot be null`,
                    },
                    isInt: {
                        msg: "Price must be an number",
                    },
                    min: {
                        args: [1],
                        msg: "Price must be more than 0",
                    },
                },
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Stock cannot be null`,
                    },
                    isInt: {
                        msg: "Stock must be an number",
                    },
                    min: {
                        args: [1],
                        msg: "Stock must be more than 0",
                    },
                },
            },
            AuthorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `AuthorId cannot be null`,
                    },
                    notEmpty: {
                        msg: `AuthorId is required`,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    Book.beforeCreate((e, opt) => (e.isbn = `${e.isbn}_${e.title}`));
    return Book;
};
