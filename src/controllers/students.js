const Students = require('../models/Students');


module.exports = {
    async store(req, res) {

        const { name, 
                email, 
                password, 
                phone, 
                birth_date, 
                rg, image_rg, 
                cpf, image_cpf, 
                cpf_responsible, 
                image_cpf_responsible, 
                img_proof_of_residence,
                genre,
            } = req.body;

        students = await Students.create({
            name:  name,
            email: email,
            password: password,
            phone: phone,
            birth_date: birth_date,
            rg: rg,
            image_rg: image_rg,
            cpf: cpf,
            image_cpf: image_cpf,
            cpf_responsible: cpf_responsible,
            image_cpf_responsible: image_cpf_responsible,
            valid: 0,
            img_proof_of_residence: img_proof_of_residence,
            genre: genre,

        });

        return res.json({
            gravado: "Sim"
        });

    }


}