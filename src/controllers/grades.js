const Discipline = require("../models/Discipline");

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
    }



}
