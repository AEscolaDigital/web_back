const Employees = require('../models/Employees');
const UserImages = require('../models/UserImages');

module.exports = {

    async store(req, res) {

        const firebaseUrl = req.files;
        const { employee_id } = req.params;
          
        try {

            let employee = await Employees.findOne({
                where: {id: employee_id}
            })

            if (!employee) {
                return res.status(400)
                    .send({ error: "Não tem nenhum aluno com esse id" })
            }

            await UserImages.create({
                image_rg: firebaseUrl.image_rg[0].firebaseUrl,
                image_cpf: firebaseUrl.image_cpf[0].firebaseUrl,
                img_proof_of_residence: firebaseUrl.image_proof_of_residence[0].firebaseUrl,
                employee_id,
            });

            return res.status(201)
                .send({
                    result: "Imagens gravado com sucesso"
                });

        } catch (error) {

            console.log(error);
            res.status(500).send(error);
        }

    },
    
    async update(req, res) {

        const firebaseUrl = req.files;

        const { employee_id } = req.params;

        const urlImage = firebaseUrl.profile_image[0].firebaseUrl

        try {

           let userImage = await UserImages.findOne({
                where: {employee_id}
           });
    
            userImage.profile_image = urlImage;

            userImage.save();

            res.status(201).send({
                result: "Imagem gravado com sucesso"
            });

        } catch (error) {

            console.log(error);
            res.status(500).send(error);
        }
    }
}