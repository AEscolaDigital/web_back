const User = require("../models/Students");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");

module.exports = {
    async store(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email: email
			}
		});

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(403)
				.send({ error: "Usuário e/ou senha inválidos" });
		}

        //generate a token for user
        const token = jwt.sign(
			{ userId: user.id },
			auth.secret,
			{
				expiresIn: "1h"
			});


		//Send response
		res.send({
			user: {
				email: user.email,
				name: user.name
			},
            token
		})
	}
}