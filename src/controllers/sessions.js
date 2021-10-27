const User = require("../models/User");
const School = require("../models/School");

const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");

module.exports = {
	async store(req, res) {

		const { email, password, role } = req.body;

		console.log(role);
		console.log(email);
		console.log(password);
		const getUser = async () => {

			let user = 'Tipo de usuário inválido';

			if (role == 'ROLE_USER' || role == "ROLE_TEACHER") {

				user = await User.findOne({ where: { email: email } });
				return user;
			}

			if (role == 'ROLE_ADMIN') {

				user = await School.findOne({ where: { email: email } });
				return user;
			}

			return res.send({
				error: 'Função de usuário inválido'
			});

		}

		const user = await getUser();

		console.log(user);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(403)
				.send({ error: "Usuário e/ou senha inválidos" });
		}

		const token = jwt.sign(
			{ userId: user.id },
			auth.secret,
			{
				expiresIn: "1h"
			});

		res.send({
			user: {
				email: user.email,
				name: user.name
			},
			token
		})
	}
}