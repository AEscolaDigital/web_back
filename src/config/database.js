module.exports = {
    url: "mysql://root:manolo@localhost:3306/school",
    config: {
        dialect: "mysql",
        define: {
            timestamp: true,
            underscored: true
        }
    }
}