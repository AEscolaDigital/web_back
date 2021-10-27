const School = require('../models/School');
const Address = require('../models/Address');
const Citie = require('../models/Citie');
const State = require('../models/State');
const Phone = require('../models/Phone');
const Prefixe = require('../models/Prefixe');
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");

module.exports = {

    async index(req, res) {
        const { school_id } = req.params;

        const school = await School.findByPk(school_id, {
            attributes: ['name', 'name_school', 'cnpj', 'email', 'school_size'],
            include:
                [
                    {
                        association: 'phone',
                        attributes: ['number'],
                        include: [{
                            association: 'prefixes',
                            attributes: ['ddd']
                        }]
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

        return res.json(school);
    },

    async store(req, res) {

        const {
            name,
            phone,
            name_school,
            cnpj,
            school_size,
            address: [{
                cep,
                street,
                district,
                number,
                city,
                uf_state,
                state,
                complement,
            }],
            email,
            password,
        } = req.body;

        try {

            // let school = await School.findOne({
            //     where: {
            //         email: email,
            //     }
            // })

            // if (school) {
            //     return res.status(400)
            //         .send({ error: "Este e-mail já está sendo utilizado" })
            // }

            const passwordCript = bcrypt.hashSync(password, 10);

             school = await School.create({
                name,
                name_school,
                cnpj,
                school_size,
                email,
                password: passwordCript,
            });
            
            let city_id = await Citie.findOrCreate({
                where: { name: city }
            });
            
            let state_id = await State.findOrCreate({
                where: { name: state, uf: uf_state }
            });
            
            let school_id = school.id
            
            await Address.create({
                street,
                school_id,
                city_id: city_id[0].dataValues.id,
                state_id: state_id[0].dataValues.id,
                number,
                cep,
                district,
                complement,
            });
            
            let ddd = phone.substr(1, 2);
            
            let ddd_id = await Prefixe.findOrCreate({
                where: { ddd: ddd }
            });
            
            await Phone.create({
                number: phone.substr(4, 10),
                school_id,
                ddd_id: ddd_id[0].dataValues.id,
            });

            const token = jwt.sign({ school_id: school.id }, auth.secret, {
                expiresIn: "1h"
            });
            
            res.status(201).send({
                school: {
                    id: school.id,
                    name: school.name,
                    name: school.name_school,
                    email: school.email
                },
                token
            });
                        
        } catch (error) {
            console.log('school: ' + error);
        }        
    
    }
}