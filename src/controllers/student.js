const Students = require('../models/Students');
const Address = require('../models/Adresses');
const Cities = require('../models/Cities');
const States = require('../models/States');
const Phones = require('../models/Phones');
const Prefixes = require('../models/Prefixes');
const bcrypt = require("bcrypt");

module.exports = {

    async index(req, res) {
        const { student_id } = req.params;

        const student = await Students.findByPk(student_id, {
            include:
                [
                    {
                        association: 'phone',
                    },
                    {
                        association: 'genre',
                        attributes: ['name'],
                    },
                    {
                        association: 'address',
                        attributes: ['street', 'number', 'cep', 'district', 'complement'],
                        include: [
                            {
                                association: 'state',
                                attributes: ['name', 'uf']
                            }, {
                                association: 'city',
                                attributes: ['name']
                            }
                        ],
                    }
                ]
        });

        return res.json(student);
    },

    async store(req, res) {
        const { name,
            email,
            password,
            phone,
            birth_date,
            rg, image_rg,
            cpf, image_cpf,
            cpf_responsible, image_cpf_responsible,
            img_proof_of_residence,
            genre_id,
            addresses: [{
                street,
                number,
                cep,
                district,
                complement,
                city,
                state,
                uf_state,
            }]
        } = req.body;

        const  passwordCript = bcrypt.hashSync(password, 10);
        // let students = await Students.findOne({
        //     where: {
        //         email: email,
        //         cpf: cpf,
        //     }
        // })

        // if (students) {
        //     return res.status(400)
        //         .send({ error: "Este e-mail ou CPF já está sendo utilizado" })
        // }

        students = await Students.create({
            name: name,
            email: email,
            password: passwordCript,
            birth_date: birth_date,
            rg: rg,
            image_rg: image_rg,
            cpf: cpf,
            image_cpf: image_cpf,
            cpf_responsible: cpf_responsible,
            image_cpf_responsible: image_cpf_responsible,
            valid: 0,
            img_proof_of_residence: img_proof_of_residence,
            genre_id: genre_id,

        });

        const city_id = await Cities.findOrCreate({
            where: { name: city }
        });

        const state_id = await States.findOrCreate({
            where: { name: state, uf: uf_state }
        });

        const student_id = students.id

        await Address.create({
            street: street,
            student_id: student_id,
            city_id: city_id[0].dataValues.id,
            state_id: state_id[0].dataValues.id,
            number: number,
            cep: cep,
            district: district,
            complement: complement,
        });

        const ddd = phone.substr(1,2);
    
        const ddd_id = await Prefixes.findOrCreate({
            where: { ddd: ddd }
        });

        await Phones.create({
            number: phone.substr(4,10),
            student_id: student_id,
            ddd_id: ddd_id[0].dataValues.id,
        });

        return res.json({ result: "Usuário gravado com sucesso" });

    }


}