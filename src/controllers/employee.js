const Employees = require('../models/Employees');
const Address = require('../models/Adresses');
const Cities = require('../models/Cities');
const States = require('../models/States');
const Phones = require('../models/Phones');
const Prefixes = require('../models/Prefixes');

module.exports = {

    async index(req, res) {
        const { employee_id } = req.params;

        const student = await Employees.findByPk(employee_id, {
            include:
                [
                    {
                       association: 'images',
                       attributes: ['image_rg', 'image_cpf','img_proof_of_residence', 'profile_image']
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

            let employee = await Employees.findOne({
                where: {
                    email: email,
                    cpf: cpf,
                }
            })

            if (employee) {
                return res.status(400)
                    .send({ error: "Este e-mail e/ou CPF já está sendo utilizado" })
            }

            employee = await Employees.create({
                name,
                email,
                password,
                birth_date,
                rg,
                cpf,
                valid: 0,
                genre_id: genre_id,
            });
            
            let city_id = await Cities.findOrCreate({
                where: { name: city }
            });
            
            let state_id = await States.findOrCreate({
                where: { name: state, uf: uf_state }
            });
            
            let employee_id = employee.id
            
            await Address.create({
                street: street,
                employee_id: employee_id,
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
                employee_id: employee_id,
                ddd_id: ddd_id[0].dataValues.id,
            });
            
            return res.status(201)
            .send({
                idUser: employee_id,
                result: "Usuário gravado com sucesso"
            });
                        
        } catch (error) {
            console.log('Employee: ' + error);
        }
    }
}