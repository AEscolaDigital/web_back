const Task = require("../models/Task");
const TaskDelivery = require("../models/TaskDelivery");


module.exports = {

    async index(req, res) {

        const { user_id, task_id } = req.params;

        const taskDelivery = await TaskDelivery.findAll({
            where: {
                user_id,
                task_id
            }
        })

        taskDelivery.forEach(taskDelivery => {

            let dataDelivery = taskDelivery.delivery_date;

            taskDelivery.dataValues.delivery_date =
                dataDelivery.toLocaleDateString("pt-BR").split('/').join('.');

        });

        return res.json(taskDelivery)

    },
    async store(req, res) {

        const { user_id } = req
        const { link, link1, file, file1, task_id } = req.body

        try {

            let task = await Task.findOne({
                where: {
                    id: task_id,
                }
            });

            if (!task) {
                return res.status(400)
                    .send({ error: "Esta tarefa não existe" })
            }

            await TaskDelivery.create({
                delivery_date: new Date(),
                status: 1,
                link,
                link1,
                file,
                file1,
                task_id,
                user_id,
            })

            return res.status(201).send({
                message: "Tarefa entregue, com sucesso"
            });

        } catch (error) {
            console.log('Task delivery: ' + error);
            res.status(500).send(error);
        }

    },
    async update(req, res) {

        const { comment, status } = req.body
        const { taskDelivery_id } = req.params

        try {

            let taskDelivery = await TaskDelivery.findByPk(taskDelivery_id);

            if (!taskDelivery) res.status(404).send({ error: "Tarefa não encontrado" });

            taskDelivery.comment = comment;
            taskDelivery.status = status;

            taskDelivery.save();

            return res.status(204).send({
                message: "Correção feita com sucesso!"
            })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}