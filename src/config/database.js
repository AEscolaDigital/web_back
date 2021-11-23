require('dotenv').config()

module.exports = {
    url: process.env.DATABASE_URL || "mysql://root:bcd127@localhost:3306/school",
    config: {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
         },
        logging: console.log,
        define: {
            timestamp: true,
            underscored: true
        },
    
    },
   
}