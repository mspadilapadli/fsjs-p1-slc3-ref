"use strict";
const { Model } = require("sequelize");
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
    }
    Book.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Title is required`,
                    },
                    notEmpty: {
                        msg: `Title cannot empty`,
                    },
                },
            },
            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `ISBN is required`,
                    },
                    notEmpty: {
                        msg: `ISBN cannot empty`,
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Price is required`,
                    },
                    notEmpty: {
                        msg: `Price cannot empty`,
                    },
                    min: {
                        args: 0,
                        msg: "Price must be more than 0",
                    },
                },
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `Stock is required`,
                    },
                    notEmpty: {
                        msg: `Stock cannot empty`,
                    },
                    min: {
                        args: 0,
                        msg: "Stock must be more than 0",
                    },
                },
            },
            AuthorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: `AuthorId is required`,
                    },
                    notEmpty: {
                        msg: `AuthorId cannot empty`,
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
