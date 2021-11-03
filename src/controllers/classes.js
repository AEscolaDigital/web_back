const Class = require('../models/Class');
const User = require('../models/User');

const { Readable } = require('stream');
const readline = require('readline');

const getPayloadJWT = require('../utils/getPayloadJWT');

module.exports = {

    async index(req, res) {

        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id;

        const classes = await Class.findAll({
            attributes: ['id', 'name'],
            where: {
                school_id
            }
        });

        return res.json(classes);
    },

    async indexUsers(req, res) {

        const { class_id } = req.params;
        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id

        const classe = await Class.findOne({
            attributes: ['name', 'id'],
            where: {
                id: class_id,
                school_id
            },
            include: [{
                attributes: ['id', 'name', 'email', 'profile_picture'],
                association: 'users',
                through: {
                    attributes: []
                },
            }]
        });


        if (classe === null)
            res.json({ error: "Essa turma não existe" });


        res.json(classe);
    },

    async store(req, res) {

        const { name } = req.body;

        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id

        try {

            let classe = await Class.findOne({
                where: {
                    school_id,
                    name,
                }
            })

            if (classe) {
                return res.status(400)
                    .send({ error: "Esta turma já está criada" })
            }

            classe = await Class.create({
                name,
                school_id
            });

            res.status(201).send({
                id: classe.id,
                name: classe.name,
            });

        } catch (error) {
            console.log('classe: ' + error);
        }

    },

    async storeMember(req, res) {

        const { email } = req.body;
        const { authorization } = req.headers;
        const { class_id } = req.params;

        const school_id = getPayloadJWT(authorization).user_id

        try {

            let user = await User.findOne({
                where: {
                    school_id,
                    email
                }
            })

            if (!user) {
                return res.status(400)
                    .send({ error: "Não há usuário cadastro com esse email" })
            }

            let classe = await Class.findOne({
                where: {
                    school_id,
                    id: class_id
                },
            })

            if (!classe) {
                return res.status(400)
                    .send({ error: "Essa não turma existe" })
            }

            await user.addClass(classe);

            res.status(201).send({
                sucess: "Usuário adicionado com sucesso"
            });

        } catch (error) {
            console.log('class: ' + error);
        }

    },

    async storeExcelFile(req, res) {
        const { authorization } = req.headers;

        const { file } = req;
        const { buffer } = file;

        const school_id = getPayloadJWT(authorization).user_id

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

                console.log(line);

                users.push({
                    email: userLineSplit[0],
                    class_id: userLineSplit[1]
                })
            }

            for await (let { email, class_id} of users) {

                let user = await User.findOne({
                    where: {
                        school_id,
                        email
                    }
                })

                let classe = await Class.findOne({
                    where: {
                        school_id,
                        id: class_id
                    },
                })
    
                await user.addClass(classe);
            }

            res.status(201).send({
                sucess: true
            });


        } catch (error) {
            console.log('Excel class: ' + error);
        }

    },

    async delete(req, res) {
        const { class_id } = req.params;

        const { authorization } = req.headers;
        const school_id = getPayloadJWT(authorization).user_id

        const classe = await Class.findOne({
            where: {
                id: class_id,
                school_id
            },
        });

        if (!classe) {
            return res.status(400).json({ error: 'Turma inexistente' });
        }

        await Class.destroy({
            where: {
                id: class_id
            }
        });

        res.json({
            sucess: "Turma excluída com sucesso"
        });
    },

    async deleteClassMember(req, res) {

        const { class_id } = req.params;
        const { id_user } = req.body;
        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id

        let user = await User.findOne({
            where: {
                id: id_user,
                school_id
            }
        })

        if (!user)
            return res.status(400)
                .json({ error: "Este usuário não existe" })

        let classe = await Class.findOne({
            where: {
                id: class_id,
                school_id
            },
        });

        if (!classe)
            return res.status(400)
                .json({ error: 'Turma inexistente' });

        await user.removeClass(classe);

        res.json({
            sucess: "Aluno excluído com sucesso"
        });
    }

}