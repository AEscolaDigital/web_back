module.exports = {
    url: process.env.DATABASE_URL || "mysql://root:abc45101922072@localhost:3306/school",
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