const Responsibles = require('../models/Responsibles');
const UserImages = require('../models/UserImages');

module.exports = {

    async store(req, res) {

        const firebaseUrl = req.files;
        const { responsible_id } = req.params;

        console.log(firebaseUrl);

          
        try {

            let responsible = await Responsibles.findOne({
                where: {id: responsible_id}
            })

            if (!responsible) {
                return res.status(400)
                    .send({ error: "Não tem nenhum reponsável com esse id" })
            }

            await UserImages.create({
                image_rg: firebaseUrl.image_rg[0].firebaseUrl,
                image_cpf: firebaseUrl.image_cpf[0].firebaseUrl,
                img_proof_of_residence: firebaseUrl.image_proof_of_residence[0].firebaseUrl,
                responsible_id,
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

        console.log(firebaseUrl);

        const { responsible_id } = req.params;

        const urlImage = firebaseUrl.profile_image[0].firebaseUrl
        console.log(urlImage);

        try {

           let userImage = await UserImages.findOne({
                where: {responsible_id}
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