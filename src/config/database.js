require('dotenv').config()

module.exports = {
    url: process.env.DATABASE_URL || "mysql://root:bcd127@localhost:3306/school",
    config: {
        dialect: "postgres",
        logging: console.log,
        define: {
            timestamp: true,
            underscored: true
        }
    }
}