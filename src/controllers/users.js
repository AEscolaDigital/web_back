const User = require('../models/User');
const sendingEmail = require('../services/smtp');
const bcrypt = require("bcrypt");
const getPayloadJWT = require('../utils/getPayloadJWT');
const { Readable } = require('stream');
const readline = require('readline');

module.exports = {

    async index(req, res) {

        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id

        const user = await User.findAll({
            raw: true,
            attributes: ['id', 'name', 'email', 'created_at'],
            order: [["id", "DESC"]],
            where: {
                school_id: school_id
            }
        });


        // user.forEach(teste => {
        //     console.log(teste.created_at.toString());
        // });

        // const date = user[0].dataValues.created_at
        // const created_at = user[0].created_at
        // const month = created_at.toString().substr(3, 5);
        // const day = created_at.toString().substr(7, 7);
        // const ano = created_at.toString().substr(10, 11);

        // console.log(created_at.toString().substr(3, 19));
        // console.log(month);
        // console.log(day);
        // console.log(ano);


        return res.json(user);
    },

    async store(req, res) {

        const {
            name,
            email,
            role_id,
        } = req.body;

        const { authorization } = req.headers;

        try {

            if (req.file === undefined) {

                let user = await User.findOne({ where: { email: email } })

                if (user) {
                    return res.status(400)
                        .send({ error: "Este e-mail já está sendo utilizado" })
                }

                const password = Math.random().toString(36).slice(-8);

                const passwordCript = bcrypt.hashSync(password, 10);

                sendingEmail(email, password, name)

                user = await User.create({
                    name,
                    email,
                    password: passwordCript,
                    role_id,
                    school_id: getPayloadJWT(authorization).user_id
                });

                res.status(201).send({
                    id: user.id,
                    email: user.name,
                    name: user.profile_picture,
                    role_id: user.role_id,
                    school_id: user.school_id,
                    updatedAt: user.updatedAt,
                    createdAt: user.createdAt
                });
            }

            if (req.file) {

                console.log("Upload pelo file");


                const { file } = req;
                const { buffer } = file;

                const readableFile = new Readable();
                readableFile.push(buffer);
                readableFile.push(null);

                const usersLine = readline.createInterface({
                    input: readableFile,
                });

                const users = [];

                for await (let line of usersLine) {
                    const userLineSplit = line.split(";")

                    users.push({
                        name: userLineSplit[0],
                        email: userLineSplit[1],
                        role_id: userLineSplit[2]
                    })
                }

                for await (let { name, email, role_id } of users) {

                    const password = Math.random().toString(36).slice(-8);

                    const passwordCript = bcrypt.hashSync(password, 10);

                    await User.create({
                        name,
                        email,
                        password: passwordCript,
                        role_id,
                        school_id: getPayloadJWT(authorization).user_id,
                    });
                    
                    sendingEmail(email, password, name)
                }

                res.status(201).send(users);

            }

        } catch (error) {
            console.log('user: ' + error);
        }

    },

    async update(req, res) {

        const firebaseUrl = req.files;

        const { user_id } = req.params;

        try {

            let user = await User.findOne({
                where: { user_id }
            });

            user.profile_picture = firebaseUrl;

            user.save();

            res.status(201).send({
                result: "Imagem gravado com sucesso"
            });

        } catch (error) {

            console.log(error);
            res.status(500).send(error);
        }

    }
}