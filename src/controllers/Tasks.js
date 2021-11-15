const Discipline = require('../models/Discipline');
const Task = require('../models/Task');
const TaskAttachments = require('../models/TasksAttachments');
const User = require('../models/User');

const payloadjtw = require("../utils/payloadjtw");

module.exports = {
    async index(req, res) {

        const { discipline_id } = req.params;

        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'date_delivery'],
            where: {
                discipline_id
            },
            order: [["id", "DESC"]],
        })

        tasks.forEach(task => {

            let data = task.date_delivery;

            let date = String(data.getDate()).padStart(2, '0');
            let month = String((data.getMonth() + 1)).padStart(2, '0');
            let fullYear = data.getFullYear();

            console.log(`${date}.${month}.${fullYear}`);
            task.dataValues.date_delivery = 
            `${date}.${month}.${fullYear}`

        });

        res.json(tasks);

    },

    async indexListUserTask(req, res) {

        const { task_id } = req.params;

        const tasks = await Task.findAll({
            attributes: [],
            where: {
                id: task_id,
            },
            include: {
                association: 'users',
                attributes: ['id', 'profile_picture', 'name'],
                through:{
                    attributes: []
                }
            },
        });

        res.json(tasks[0].users);

    },

    async store(req, res) {

        const { discipline_id } = req.params;

        const {
            name,
            description,
            date_delivery,
            spots,
            link,
            link1,
            link2,
            file,
            file1,
            file2

        } = req.body;


        try {

            let discipline = await Discipline.findOne({
                where: { id: discipline_id },
                attributes: ['id'],
                include: {
                    association: 'users',
                    attributes: ["id"],
                    through: {
                        attributes: [],
                    }
                }
            })

            if (!discipline) {
                return res.status(400)
                    .send({ error: "Esta disciplina, não existe" })
            }

            let task = await Task.findOne({
                where: {
                    name,
                    discipline_id
                }
            })

            if (task) {
                return res.status(400)
                    .send({ error: "Esta tarefa já foi criado, para essa disciplina" })
            }


            task = await Task.create({
                name,
                description,
                date_delivery,
                spots,
                discipline_id
            });

            await TaskAttachments.create({
                link,
                link1,
                link2,
                file,
                file1,
                file2,
            })

            const users_id = []

            await discipline.users.forEach(user => {
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

                await user.addTask(task);
            }

            res.status(201).send({
                sucess: "Tarefa criada com sucesso"
            });

        } catch (error) {
            console.log('Tasks: ' + error);
        }

    }
}