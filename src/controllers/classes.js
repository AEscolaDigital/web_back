const Class = require('../models/Class');
const User = require('../models/User');

const getPayloadJWT = require('../utils/getPayloadJWT');

module.exports = {

    async index(req, res) {

        const classes = await Class.findAll();

        return res.json(classes);
    },

    async indexUsers(req, res) {
        const { class_id } = req.params;

        const classe = await Class.findByPk(class_id, {
            attributes: ['name', 'id'],

            include: [{
                attributes: ['id', 'name', 'email', 'profile_picture'],
                association: 'users',
                through: {
                    attributes: []
                },
            }]
        });

        return res.json(classe);
    },

    async store(req, res) {

        const { name } = req.body;

        const { authorization } = req.headers;

        const school_id = getPayloadJWT(authorization).user_id

        try {

            let class_ = await Class.findOne({
                where: {
                    school_id,
                    name,
                }
            })

            if (class_) {
                return res.status(400)
                    .send({ error: "Esta turma já está criada" })
            }

            class_ = await Class.create({
                name,
                school_id
            });

            res.status(201).send({
                id: class_.id,
                name: class_.name,
            });

        } catch (error) {
            console.log('classe: ' + error);
        }

    },
    async storeAddMember(req, res) {

        const { email, id } = req.body;

        const { authorization } = req.headers;

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
                    id
                }
            })

            if (!classe) {
                return res.status(400)
                    .send({ error: "Turma " })
            }

            await user.addClass(classe);


            res.status(201).send({
                sucess: "Usuário adicionado com sucesso"
            });

        } catch (error) {
            console.log('class: ' + error);
        }

    },

}