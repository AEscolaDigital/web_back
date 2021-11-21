const Discipline = require("../models/Discipline");
const Class = require("../models/Class");
const User = require("../models/User");
const School = require("../models/School");

module.exports = {
    async index(req, res) {

        const { user_id, role } = req

        const id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];
        const idTeacher = role === 'ROLE_TEACHER' ? true : false;
        
        let disciplines

        if (!id[1]) {
            disciplines = await Discipline.findAll({
                attributes: ['id', 'name', 'image', 'teacher_name'],
                where: { school_id: id[0] },
                order: [["id", "DESC"]],
            })
        }

        if (!id[0]) {
            discipline = await Discipline.findAll({
                attributes: ['id', 'name', 'image', 'teacher_name'],
                include: {
                    association: 'users',
                    attributes: ['id'],
                    where: {
                        id: id[1]
                    },
                    through:{
                        attributes: []
                    }
                }
            })

        }

        if (idTeacher) {
            disciplines = await Discipline.findAll({
                attributes: ['id', 'name', 'image', 'teacher_name'],
                where: { user_id },
                order: [["id", "DESC"]],
                //include: {
                    //association: "users",
                    // attributes: ['name']
                //}
            })
        }

        res.json(disciplines);

    },

    async store(req, res) {

        const { name, class_id } = req.body
        const { firebaseUrl } = req.file ? req.file : "";
        const { user_id, role } = req

        const id = role === 'ROLE_ADMIN' ? [user_id, null] : [null, user_id];

        try {

            let classe = await Class.findOne({
                where: { id: class_id },
                include: {
                    attributes: ["id"],
                    association: "users",
                    through: {
                        attributes: [],
                    }
                }
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

            let teacher

            if (!id[1]) {
                teacher = await School.findByPk(id[0]);
            } else {
                teacher = await User.findByPk(id[1]);
            }      

            console.log(teacher.name);

            discipline = await Discipline.create({
                name,
                class_id,
                image: firebaseUrl,
                teacherName: teacher.name,
                user_id: id[1],
                school_id: id[0]
            });

            const users_id = []

            await classe.users.forEach(user => {
                const user_id = user.id;

                users_id.push({
                    user_id
                })
            })

            for await (let { user_id } of users_id) {

                let user = await User.findOne({
                    where: {
                        id: user_id
                    }
                })

                await user.addDiscipline(discipline);
            }

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
        const { user_id, role } = req

        user_id = role === 'ROLE_ADMIN' ? [user_id, ''] : ['', user_id];

        let discipline

        if (!user_id[1]) {
            discipline = await Discipline.findOne({
                where: { school_id: user_id[0], id }
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