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
            order: [
                ["id", "DESC"]
            ],
        })

        tasks.forEach(task => {

            let data = task.date_delivery;

            let date = String(data.getDate()).padStart(2, '0');
            let month = String((data.getMonth() + 1)).padStart(2, '0');
            let fullYear = data.getFullYear();

            task.dataValues.date_delivery =
                `${date}.${month}.${fullYear}`

        });

        res.json(tasks);

    },
    async indexListTask(req, res) {

        const { task_id } = req.params;

        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'description', 'date_delivery', 'spots', 'created_at'],
            where: {
                id: task_id,
            },
            include: [{
                    association: 'discipline',
                    attributes: ['user_id', 'school_id'],
                    include: [{
                            association: 'user',
                            attributes: ['name', 'profile_picture'],
                        },
                        {
                            association: 'school',
                            attributes: ['name', 'profile_picture'],
                        }
                    ]
                },
                {
                    association: 'tasksAttachments',
                    attributes: ['link', 'link1', 'link2', 'file', 'file1', 'file2']
                }
            ],
        })

        tasks.forEach(task => {

            let dataDelivery = task.date_delivery;
            let dataCreatedAt = task.dataValues.created_at;

            task.dataValues.date_delivery =
                dataDelivery.toLocaleDateString("pt-BR").split('/').join('.');

            task.dataValues.created_at =
                dataCreatedAt.toLocaleDateString("pt-BR").split('/').join('.');

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
                through: {
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
        } = req.body;

        const files = req.files;

        const file = files.file ? files.file[0].firebaseUrlFile : null;
        const file1 = files.file1 ? files.file1[0].firebaseUrlFile1 : null;
        const file2 = files.file2 ? files.file2[0].firebaseUrlFile2 : null;

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

            const taskAttachments = await TaskAttachments.create({
                link,
                link1,
                link2,
                file,
                file1,
                file2,
            })

            task = await Task.create({
                name,
                description,
                date_delivery,
                spots,
                discipline_id,
                task_attachments_id: taskAttachments.id
            });

            const users_id = []

            await discipline.users.forEach(user => {
                const user_id = user.id;
                users_id.push({
                    user_id
                })
            })

            for await (let { user_id }
                of users_id) {

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