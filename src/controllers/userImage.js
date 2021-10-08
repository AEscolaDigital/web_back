const Students = require('../models/Students');
const UserImages = require('../models/UserImages');

module.exports = {

    async store(req, res) {

        const firebaseUrl = req.files;
        const { user_id } = req.params;

        try {

            // let students = await Students.findOne({
            //     where: {id: user_id}
            // })

            // if (!students) {
            //     return res.status(400)
            //         .send({ error: "Não tem nenhum usuário com esse id" })
            // }

            // const have_profile_picture = Object.assign({image_profile: 5 }, firebaseUrl);

            // console.log(have_profile_picture);


            // console.log(have_profile_picture.firebaseUrl == '');

            // let image_profile;

            // if (have_profile_picture.image_profile == 5) {
            //     image_profile = 'aaaaaaa'
            //     console.log("aaaaaaaaa");
            // } else {
            //     image_profile = firebaseUrl.image_profile[0].firebaseUrl
            // }

            await UserImages.create({
                image_rg: firebaseUrl.image_rg[0].firebaseUrl,
                image_cpf: firebaseUrl.image_cpf[0].firebaseUrl,
                image_cpf_responsible: firebaseUrl.image_cpf_responsible[0].firebaseUrl,
                img_proof_of_residence: firebaseUrl.image_proof_of_residence[0].firebaseUrl,
                student_id: user_id,
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

        const user_id = req.params;

        try {
            let userImage = await UserImages.findByPk(user_id);

            if (!userImage) res.status(404).send({ error: "Usuário não encontrado" });

            UserImages.profile_image = firebaseUrl.image_profile[0].firebaseUrl;

            userImage.save();

            res.status(204).send({
                result: "Imagem gravado com sucesso"
            });

        } catch (error) {

            console.log(error);
            res.status(500).send(error);
        }

    }
}