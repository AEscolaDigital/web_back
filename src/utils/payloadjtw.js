const jwt = require("jsonwebtoken");


const payload = (req, res, next) => {

    const { authorization } = req.headers;
    const [Bearer, token] = authorization.split(" ");

    const payload = jwt.decode(token);
    return payload;
};

module.exports = payload;
