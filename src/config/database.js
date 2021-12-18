require("dotenv").config();

module.exports = {
    url: process.env.HEROKU_POSTGRESQL_GREEN_URL,
    config: {
        dialect: "postgres",
        define: {
            timestamp: true,
            underscored: true
        },
    },
}