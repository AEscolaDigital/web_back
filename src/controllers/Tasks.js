const Task = require('../models/Task');
const TaskAttachments = require('../models/Tasks_attachments');


module.exports = {
    async index(req, res) {

        const { discipline_id } = req.params;

        task =  await Task.findAll()

        // const { user_id, role } = payloadjtw(req);
        // const id = role === 'ROLE_ADMIN' ? [user_id,] : [, user_id];

        // let disciplines

        // if (!id[1]) {
        //     disciplines = await Discipline.findAll({
        //         attributes:['id', 'name', 'image'],
        //         where: { school_id: id[0] },
        //         order: [["id", "DESC"]],
        //         include:{
        //             association: "school",
        //             attributes: ['name']
        //         }
        //     })
        // } else {
        //     disciplines = await Discipline.findOne({
        //         where: { user_id: id[1] },
        //         include:{
        //             association: "users",
        //             attributes: ['name']
        //         }
        //     })
        // }

        res.json(task);

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

            res.status(201).send({
                sucess: "Tarefa criada com sucesso"
            });

            return task




        } catch (error) {
            console.log('Tasks: ' + error);
        }

    }
}