const Discipline = require("../models/Discipline");
const { update } = require("../models/Note");
const Note = require("../models/Note");
const User = require("../models/User");

module.exports = {

    async findDisciplineByClassId(req, res) {

        const { class_id } = req.params;
        const { user_id, role } = req

        role === "ROLE_ADMIN" ? roleAdmin() : roleTeacher()

        const roleAdmin = async () => {

            const discipline = await Discipline.findAll({
                where: {
                    class_id,
                    school_id

                }
            })

            return discipline;
        }

        const roleTeacher = async () => {

            const discipline = await Discipline.findAll({
                where: {
                    class_id,
                    user_id
                }
            })

            return discipline;
        }
    },

    async index(req, res) {

        const { class_id, discipline_id } = req.params;

        const note = await Note.findAll({
            attributes: ['note_1', 'note_2', 'note_3', 'note_4', 'assessment', 'semester'],
            where:{
                class_id,
                discipline_id
            },
            include:
                [
                    {
                        association: 'user',
                        attributes: ['id', 'name', 'profile_picture']
                    },
                ]
        });

        return res.json(note);

    },
    async update(req, res) {

        const {
            note_1,
            note_2,
            note_3,
            note_4,
            assessment,
            discipline_id,
            class_id,
            user_id
        } = req.body;

        try {

            
            let note = await Note.findOne({
                where: { user_id, discipline_id, class_id}
            });

            note.note_1 = note_1;
            note.note_2 = note_2;
            note.note_3 = note_3;
            note.note_4 = note_3;
            note.assessment = assessment;

            note.save();
         
            return res.status(204).send({
                message: "Notas lançadas com sucesso!"
            })

        } catch (error) {
            console.log('Grades: ' + error);
        }

    }



}
