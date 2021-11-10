module.exports = {
    url: "mysql://root:bcd127@localhost:3306/school",
    config: {
        dialect: "mysql",
        define: {
            timestamp: true,
            underscored: true
        }
    }
}