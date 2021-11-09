const Discipline = require("../models/Discipline");
const Class = require("../models/Class");

const payloadjtw = require("../utils/payloadjtw");

module.exports = {
    async index(req, res) {

        const { user_id, role } = payloadjtw(req);
        const id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];

        let disciplines

        if (!id[1]) {
            disciplines = await Discipline.findAll({
                attributes:['id', 'name', 'image'],
                where: { school_id: id[0] },
                order: [["id", "DESC"]],
                include:{
                    association: "school",
                    attributes: ['name']
                }
            })
        } else {
            disciplines = await Discipline.findOne({
                where: { user_id: id[1] },
                include:{
                    association: "users",
                    attributes: ['name']
                }
            })
        }

      

        res.json(disciplines);

    },

    async store(req, res) {

        const { name, class_id } = req.body
        const { firebaseUrl } = req.file ? req.file : "";

        console.log(req.file);

        const { user_id, role } = payloadjtw(req);

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
                image: firebaseUrl,
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

        let { user_id, role } = payloadjtw(req)
        user_id = role === 'ROLE_ADMIN' ? [user_id, ''] : [ '', user_id];

        let discipline

        if (!user_id[1]) {
            discipline = await Discipline.findOne({
                where: {  school_id: user_id[0], id }
            })

        } else {
            discipline = await Discipline.findOne({
                where: { user_id: user_id[1], id }
            })

        }

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