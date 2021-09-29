const Students = require('../models/Students');

module.exports = {

    async index(req, res) {
        const { student_id } = req.params;

        const user = await Students.findByPk(student_id);

        return res.json(user);
    }
};