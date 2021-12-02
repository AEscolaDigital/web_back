const Class = require('../models/Class');
const User = require('../models/User');

const { Readable } = require('stream');
const readline = require('readline');
const { Op } = require('sequelize');
const payloadjtw = require("../utils/payloadjtw");
const Discipline = require('../models/Discipline');

module.exports = {

    async index(req, res) {

        const { page_number } = req.params;
        let { user_id, school_id, role } = req

        const offset = page_number * 10 - 10;
        school_id = role === "ROLE_ADMIN" ? user_id : school_id

        const classes = await Class.findAndCountAll({
            attributes: ['id', 'course_name', 'sigla'],
            order: [["id", "DESC"]],
            where: {
                school_id
            },
            limit: 7,
            offset: parseInt(offset)
        });

        return res.json(classes);
    },

    async indexSearch(req, res) {

        const { search } = req.params;
        let { user_id, school_id, role } = req

        school_id = role === "ROLE_ADMIN" ? user_id : school_id

        const classes = await Class.findAll({
            attributes: ['id', 'name'],
            where: {
                school_id,
                name: {
                    [Op.like]: `%${search}%`
                },
            }
        });

        return res.json(classes);
    },

    async indexUsers(req, res) {

        const { class_id, page_number } = req.params;

        const school_id = payloadjtw(req).user_id;
        const offset = page_number * 10 - 10;

        const classe = await Class.findAndCountAll({
            attributes: ['id', 'course_name', 'sigla'],
            where: {
                id: class_id,
                school_id,
            },
            include: [{
                association: 'users',
                order: [["id", "DESC"]],

                through: {
                    attributes: []
                }
            }],
            order: [
                ['users', 'name', 'ASC']
            ],
        });

        if (classe === null)
            res.json({ error: "Essa turma não existe" });

        res.json(classe);
    },

    async store(req, res) {

        const { course_name, sigla, start_date } = req.body;
        const { firebaseUrl } = req.file ? req.file : "";
        const { user_id } = req

        try {

            let classe = await Class.findOne({
                where: {
                    school_id: user_id,
                    sigla,
                }
            })

            if (classe) {
                return res.status(400)
                    .send({ error: `Já tem uma turma com essa sigla ${sigla}` })
            }

            classe = await Class.create({
                course_name,
                sigla,
                start_date,
                school_id: user_id,
                image: firebaseUrl,
            });

            res.status(201).send([{
                course_name: classe.course_name,
                sigla: classe.sigla,
                start_date: classe.start_date,
                image: classe.image,
            }]);

        } catch (error) {
            console.log('classe: ' + error);
        }

    },

    async storeMember(req, res) {

        const { email } = req.body;
        const { class_id } = req.params;

        const school_id = payloadjtw(req).user_id;

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


            let discipline = await Discipline.findAll({
                where: {
                    class_id
                }
            });


            await user.addClass(classe);
            await user.addDiscipline(discipline);


            res.status(201).send({
                sucess: "Usuário adicionado com sucesso"
            });

        } catch (error) {
            console.log('class: ' + error);
        }

    },

    async storeExcelFile(req, res) {

        const { class_id } = req.body

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
                    email: userLineSplit[0],
                    class_id
                })
            }

            for await (let { email, class_id } of users) {

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

        const school_id = payloadjtw(req).user_id;

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

        const { class_id, user_id } = req.params;

        const school_id = payloadjtw(req).user_id;

        let user = await User.findOne({
            where: {
                id: user_id,
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