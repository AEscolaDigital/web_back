module.exports = {
    url: process.env.DATABASE_URL || "mysql://root:bcd127@localhost:3306/school",
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