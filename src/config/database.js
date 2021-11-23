require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    url: process.env.DATABASE_URL || "mysql://root:bcd127@localhost:3306/school",
    config: {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            timestamp: true,
            underscored: true
        },

    },

})


module.exports = sequelize;
