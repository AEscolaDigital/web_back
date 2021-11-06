const Discipline = require("../models/Discipline");
const Class = require("../models/Class");

const jwt = require("jsonwebtoken");

const payloadjtw = require("../utils/payloadjtw");

module.exports = {
    async index(req, res) {

        const { authorization } = req.headers;

        const [Bearer, token] = authorization.split(" ");
        const { user_id, role } = jwt.decode(token);

        const id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];

        let disciplines

        if (!id[1]) {
            disciplines = await Discipline.findAll({
                where: { school_id: 1 }
            })
        } else {
            disciplines = await Discipline.findOne({
                where: { user_id: id[1] }
            })
        }

        res.json(disciplines);

    },

    async store(req, res) {

        const { name, class_id } = req.body
        const { authorization } = req.headers;

        const [Bearer, token] = authorization.split(" ");
        const { user_id, role } = jwt.decode(token);

        const id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];

        try {

            let classe = await Class.findOne({
                where: { id: class_id }
            })

            if (!classe)
                return res.status(400)
                    .send({ error: "Esta turma não existe" })


            let discipline

            if (!id[1]) {

                discipline = await Discipline.findOne({
                    where: { name, school_id: id[0] }
                })

            } else {

                discipline = await Discipline.findOne({
                    where: { name, user_id: id[1] }
                })

            }


            if (discipline)
                return res.status(400)
                    .send({ error: "Esta disciplina já está criada" })

            discipline = await Discipline.create({
                name,
                class_id,
                user_id: id[1],
                school_id: id[0]
            });

            res.status(201).send({
                id: discipline.id,
                name: discipline.name,
                class_id: discipline.class_id,
                updatedAt: discipline.updated_at,
                createdAt: discipline.create_at
            });

        } catch (error) {
            console.log('Discipline: ' + error);
        }
    },

    async delete(req, res) {

        const { id } = req.params;

        console.log(payloadjtw(req));
        

        // const { authorization } = req.headers;

        // const [Bearer, token] = authorization.split(" ");
        // const { user_id, role } = jwt.decode(token);

        // user_id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];

        let discipline = await Discipline.findOne({ where: { id, school_id } })

        if (!discipline)
            return res.status(400)
                .send({ error: "Esta disciplina não existe" })

        await Discipline.destroy({
            where: { id }
        });

        res.json({
            sucess: "Disciplina excluída com sucesso"
        });
    }
}