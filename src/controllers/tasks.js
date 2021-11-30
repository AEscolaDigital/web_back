const Discipline = require('../models/Discipline');
const Task = require('../models/Task');
const TaskDelivery = require('../models/TaskDelivery');
const TaskAttachments = require('../models/TasksAttachments');
const User = require('../models/User');

const sequelize = require("sequelize");

module.exports = {
    async index(req, res) {

        const { discipline_id } = req.params;
        const { user_id } = req

        const userTasks = await User.findAll({
            where: {
                id: user_id,
            },
            attributes: ['id'],
            include: {
                attributes: [
                    'id',
                    'name',
                    [sequelize.fn('date_format', sequelize.col('date_delivery'), '%d.%m.%Y'), 'date_delivery']],
                association: 'task',
                where: {
                    discipline_id
                },
                through: {
                    attributes: [],
                }
            },
        });

        const tasks = userTasks.length == 0 ? userTasks : userTasks[0].task

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
                },
            },
            order: [
                ['users', 'name', 'ASC']
            ],

        });

        const tasksDelivery = await TaskDelivery.findAll({
            raw: true,
            attributes: ['status', 'user_id'],
            where: {
                task_id,
            }
        })


        tasks[0].users.map(taskUser => {

            taskUser.dataValues.status = 0;

            for (let i = 0; i < tasksDelivery.length; i++) {

                if (tasksDelivery[i].user_id === taskUser.dataValues.id) {
                    taskUser.dataValues.status = tasksDelivery[i].status
                }
            }
        })

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

        const spot = spots === '' ? null : spots

        const files = req.files;

        const file = files.file ? files.file[0].firebaseUrlFile : "";
        const file1 = files.file1 ? files.file1[0].firebaseUrlFile1 : "";
        const file2 = files.file2 ? files.file2[0].firebaseUrlFile2 : "";

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
                spots: spot,
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

    },

    async delete(req, res) {

        const { user_id, task_id } = req.params;

        try {

            let user = await User.findByPk(user_id);
            let task = await Task.findByPk(task_id);

            await user.removeTask(task);

            res.status(204).send();

        } catch (error) {
            res.status(500).send(error);
        }
    }

}