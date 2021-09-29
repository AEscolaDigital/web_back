const Student = require('../models/Students');

module.exports = {
    async index(req, res) {
        const { student_id } = req.params;

        console.log(student_id)

        const student = await Student.findByPk(student_id, {
           include: { association: 'genres' }
        })

        return res.json(student);
    },
}