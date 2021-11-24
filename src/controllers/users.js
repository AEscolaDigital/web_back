const User = require('../models/User');

const bcrypt = require("bcrypt");
const { Readable } = require('stream');
const readline = require('readline');

const sendingEmail = require('../services/smtp');
const payloadjtw = require("../utils/payloadjtw");

module.exports = {

    async index(req, res) {
        const { page_number } = req.params;

        const offset = page_number * 10 - 10;
        const school_id = payloadjtw(req).user_id;

        const users = await User.findAndCountAll({
            raw: true,
            attributes: ['id', 'name', 'email', 'role_id', 'created_at'],
            order: [["id", "DESC"]],
            limit: 10,
            offset: parseInt(offset),
            where: {
                school_id: school_id
            }
        })

        users.rows.forEach(users => {
            let data = users.created_at;

            let date = String(data.getDate()).padStart(2, '0');
            let month = String((data.getMonth() + 1)).padStart(2, '0');
            let fullYear = data.getFullYear();

            var hours = String(data.getHours()).padStart(2, '0');
            let minutes = String(data.getMinutes()).padStart(2, '0');

            users.created_at = `${date}.${month}.${fullYear} 
                                ${hours}:${minutes}`

        });

        res.json(users);
    },

    async store(req, res) {

        const {
            name,
            email,
            role_id,
        } = req.body;

        const school_id = payloadjtw(req).user_id;

        try {

            let user = await User.findOne({ where: { email: email } })

            // if (user) {
            //     return res.status(400)
            //         .send({ error: "Este e-mail já está sendo utilizado" })
            // }

            const password = "123456";

            //const password = Math.random().toString(36).slice(-8);

            const passwordCript = bcrypt.hashSync(password, 10);

            sendingEmail(email, password, name)

            user = await User.create({
                name,
                email,
                password: passwordCript,
                role_id,
                school_id,
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


        } catch (error) {
            console.log('user: ' + error);
        }

    },

    async storeExcelFile(req, res) {

        const { file } = req;
        const { buffer } = file;

        const school_id = payloadjtw(req).user_id;

        try {

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
                    school_id,
                });

                if (email === "samuel.a.goulart@gmail.com") {
                    sendingEmail(email, password, name)
                }
            }

            res.status(201).send({
                sucess: true
            });


        } catch (error) {
            console.log('Excel user: ' + error);
        }

    },


    async update(req, res) {

        const { firebaseUrl } = req.file;

        const user_id = payloadjtw(req).user_id;

        try {

            if (!req.file) {
                return res.json({ error: "Envie uma imagem" })
            }

            let user = await User.findOne({
                where: { id: user_id }
            });

            user.profile_picture = firebaseUrl;

            user.save();

            res.status(201).send({
                result: "Imagem gravado com sucesso"
            });

        } catch (error) {

            res.status(500).send(error);
        }

    }
}