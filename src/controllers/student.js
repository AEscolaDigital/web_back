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
                       association: 'images',
                       attributes: ['image_rg', 'image_cpf', 'image_cpf_responsible', 'img_proof_of_residence', 'profile_image']
                    },
                    {
                        association: 'phone',
                        attributes: ['number'],
                        include: [{
                            association: 'prefixes',
                            attributes: ['ddd']
                        }]
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

        const {
            name,
            email,
            password,
            phone,
            birth_date,
            rg,
            cpf,
            cpf_responsible,
            genre_id,
            street,
            number,
            cep,
            district,
            complement,
            city,
            state,
            uf_state,
        } = req.body;

        try {

            let students = await Students.findOne({
                where: {
                    email: email,
                    cpf: cpf,
                }
            })

            if (students) {
                return res.status(400)
                    .send({ error: "Este e-mail e/ou CPF já está sendo utilizado" })
            }

            const  passwordCript = bcrypt.hashSync(password, 10);

            students = await Students.create({
                name,
                email,
                password: passwordCript,
                birth_date,
                rg,
                cpf,
                cpf_responsible,
                valid: 0,
                genre_id: genre_id,
            });
            
            let city_id = await Cities.findOrCreate({
                where: { name: city }
            });
            
            let state_id = await States.findOrCreate({
                where: { name: state, uf: uf_state }
            });
            
            let student_id = students.id
            
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
            
            let ddd = phone.substr(1, 2);
            
            let ddd_id = await Prefixes.findOrCreate({
                where: { ddd: ddd }
            });
            
            await Phones.create({
                number: phone.substr(4, 10),
                student_id: student_id,
                ddd_id: ddd_id[0].dataValues.id,
            });
            
            return res.status(201)
            .send({
                idUser: student_id,
                result: "Usuário gravado com sucesso"
            });
                        
        } catch (error) {
            console.log('student: ' + error);
        }        
        
        return res.json({ result: "Usuário gravado com sucesso" });

    }
}