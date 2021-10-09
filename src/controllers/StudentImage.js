const Students = require('../models/Students');
const UserImages = require('../models/UserImages');

module.exports = {

    async store(req, res) {

        const firebaseUrl = req.files;
        const { student_id } = req.params;
          
        try {

            let students = await Students.findOne({
                where: {id: student_id}
            })

            if (!students) {
                return res.status(400)
                    .send({ error: "Não tem nenhum aluno com esse id" })
            }

            await UserImages.create({
                image_rg: firebaseUrl.image_rg[0].firebaseUrl,
                image_cpf: firebaseUrl.image_cpf[0].firebaseUrl,
                image_cpf_responsible: firebaseUrl.image_cpf_responsible[0].firebaseUrl,
                img_proof_of_residence: firebaseUrl.image_proof_of_residence[0].firebaseUrl,
                student_id,
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

        const { student_id } = req.params;

        const urlImage = firebaseUrl.profile_image[0].firebaseUrl

        try {

           let userImage = await UserImages.findOne({
                where: {student_id}
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