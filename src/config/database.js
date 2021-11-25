require("dotenv").config();

module.exports = {
    url: process.env.DATABASE_URL,
    config: {
        dialect: "mysql",
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