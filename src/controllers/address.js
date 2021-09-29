const Address = require('../models/Adresses');
const Students = require('../models/Students');

module.exports = {
    async index(req, res) {
        const { student_id } = req.params;

        const user = await Students.findByPk(student_id, {
            include: { 
                association: 'addresses',
            }
        });

        return res.json(user);
    },

    async store(req, res) {
        const { student_id } = req.params;
        const { street, number, cep, district, complement } = req.body;

        const user = await Students.findByPk(student_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const address = await Address.create({
            street,
            number,
            cep,
            district,
            complement,
            student_id,
        });

        return res.json(address);
    }
};