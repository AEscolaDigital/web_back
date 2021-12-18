require("dotenv").config();

module.exports = {
    url: process.env.HEROKU_POSTGRESQL_GREEN_URL,
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
}