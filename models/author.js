"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Author.hasMany(models.Book);
        }
        static async getAuthorsWithTotalBooks(where) {
            try {
                const authors = await Author.findAll({
                    attributes: [
                        "id",
                        "name",
                        "age",
                        "gender",
                        [
                            sequelize.fn("COUNT", sequelize.col("Books.id")),
                            "totalBooks",
                        ],
                    ],
                    include: {
                        model: this.sequelize.models.Book,
                        attributes: [],
                    },
                    where,
                    group: ["Author.id"],
                    order: [["id", "ASC"]],
                });
                return authors;
            } catch (error) {
                throw error;
            }
        }
    }
    Author.init(
        {
            name: DataTypes.STRING,
            age: DataTypes.INTEGER,
            gender: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Author",
        }
    );
    return Author;
};
