const School = require("../models/School");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");

module.exports = {
	async store(req, res) {

		const { email, password, typeUser } = req.body;

		const getUser = async () => {

			if (typeUser == 'student') {

				const user =  await Students.findOne({ where: { email: email } });
				return user;

			}else if (typeUser == 'school'){

			   const user = await School.findOne({ where: { email: email } });
			   return user;

			}else if (typeUser == 'teacher'){

				const user = await Responsibles.findOne({ where: { email: email } });
				return user;
			}
			else{
                return res.send({
                      error: 'Tipo de usuário inválido'
				});
			}

		}
        
		 const user = await getUser();

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(403)
				.send({ error: "Usuário e/ou senha inválidos" });
		}

		const token = jwt.sign(
			{ userId: user.id },
			auth.secret,
			{
				expiresIn: "2h"
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