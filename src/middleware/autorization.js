const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ error: "Token não informado" });

  const [Bearer, token] = authorization.split(" ");

  if (!token) return res.status(401).send({ error: "Token com formatação incorreta" });

  try {

    const payload = jwt.verify(token, auth.secret);
    req.user_id = payload.user_id;
    req.role = payload.role;
    req.school_id = payload.school_id;

    return next();

  } catch (error) {

    res.status(401).send({ error: "Token inválido" });

  }
};
