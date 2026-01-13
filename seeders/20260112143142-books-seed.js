"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = require("../data/books.json").map((e) => {
            e.createdAt = e.updatedAt = new Date();
            return e;
        });
        await queryInterface.bulkInsert("Books", data, {});

        /**
         * Add seed commands here.
         *
         * Example:
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Books", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
    },
};
