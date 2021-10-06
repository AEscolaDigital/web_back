const Students = require('../models/Students');
const Address = require('../models/Adresses');
const Cities = require('../models/Cities');
const States = require('../models/States');
const Phones = require('../models/Phones');
const Prefixes = require('../models/Prefixes');

module.exports = {

    async index(req, res) {
        const { student_id } = req.params;

        const student = await Students.findByPk(student_id, {
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

        const firebaseUrl = req.files;

        

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

            // if (students) {
            //     return res.status(400)
            //         .send({ error: "Este e-mail e/ou CPF já está sendo utilizado" })
            // }

            
            const getNameFile = () => {
                
                const nameFileRG = firebaseUrl.image_rg[0].firebaseUrl;
                const nameFileCPF = firebaseUrl.image_cpf[0].firebaseUrl;
                const nameFileCpfResponsible = firebaseUrl.image_cpf_responsible[0].firebaseUrl;
                const nameFileProofOfResidence = firebaseUrl.image_proof_of_residence[0].firebaseUrl;
                
                if (nameFileRG == undefined) {
                    
                    if (nameFileCPF == undefined) {
                        
                        if (nameFileCpfResponsible == undefined) {
                            return nameFileProofOfResidence;
                        } else {
                            return nameFileCpfResponsible
                        }
                    } else {
                        return nameFileCPF;
                    }
                    
                } else {
                    return nameFileRG;
                }
                
            }
            
            const nameFile = getNameFile();
            
            
            const BUCKET = "school-12606.appspot.com";
            const fileRG = `https://storage.googleapis.com/${BUCKET}/students/rg/${nameFile}`
            const fileCPF = `https://storage.googleapis.com/${BUCKET}/students/cpf/${nameFile}`
            const fileCpfResponsible = `https://storage.googleapis.com/${BUCKET}/students/cpf_responsible/${nameFile}`
            const fileCpfProofOfResidence = `https://storage.googleapis.com/${BUCKET}/students/proof_of_residence/${nameFile}`
            
            
            students = await Students.create({
                name: name,
                email: email,
                password: password,
                birth_date: birth_date,
                rg: rg,
                image_rg: fileRG,
                cpf: cpf,
                image_cpf: fileCPF,
                cpf_responsible: cpf_responsible,
                image_cpf_responsible: fileCpfResponsible,
                valid: 0,
                img_proof_of_residence: fileCpfProofOfResidence,
                genre_id: genre_id,
                
            });
            
            
            students = await Students.create({
                name: name,
                email: email,
                password: password,
                birth_date: birth_date,
                rg: rg,
                image_rg: fileRG,
                cpf: cpf,
                image_cpf: fileCPF,
                cpf_responsible: cpf_responsible,
                image_cpf_responsible: fileCpfResponsible,
                valid: 0,
                img_proof_of_residence: fileCpfProofOfResidence,
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
            
            
            const ddd = phone.substr(1, 2);
            
            const ddd_id = await Prefixes.findOrCreate({
                where: { ddd: ddd }
            });
            
            await Phones.create({
                number: phone.substr(4, 10),
                student_id: student_id,
                ddd_id: ddd_id[0].dataValues.id,
            });
            
            return res.status(201)
            .send({
                result: "Usuário gravado com sucesso"
            });
            
            return console.log(nameFile);
        } catch (error) {
            console.log('student: ' + error);
        }


    }


}