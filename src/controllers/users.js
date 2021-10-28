const User = require('../models/User');
const sendingEmail = require('../services/smtp');
const bcrypt = require("bcrypt");

module.exports = {

    async index(req, res) {
        const user = await User.findAll({
            raw:true,
            attributes: ['name', 'email', 'created_at'],
            order: [["id", "DESC"]]

        });

        // console.log(user);

        // user.forEach(teste =>{
        //     console.log(teste.name);
        // });

        // const date = user[0].dataValues.created_at

        // console.log(date);

        return res.json(user);
    },

    async store(req, res) {

        const {
            name,
            email,
            role_id,

        } = req.body;

        try {

           // let user = await User.findOne({ where: { email: email }})

            // if (user) {
            //     return res.status(400)
            //         .send({ error: "Este e-mail já está sendo utilizado" })
            // }

            const password = Math.random().toString(36).slice(-8);
            
            const passwordCript = bcrypt.hashSync(password, 10);

          //  sendingEmail(email, password, name)

            user = await User.create({
                name,
                email,
                password: passwordCript,
                role_id
            });
            
            res.status(201).send({
                user: {
                    id: user.id,
                    email: user.name,
                    name: user.profile_picture,
                },
            });

                        
        } catch (error) {
            console.log('user: ' + error);
        }        
    
    },

    async update(req, res) {

        const firebaseUrl = req.files;

        const { user_id } = req.params;

        try {

            let user = await User.findOne({
                 where: {user_id}
            });
     
             user.profile_picture = firebaseUrl;
 
             user.save();
 
             res.status(201).send({
                 result: "Imagem gravado com sucesso"
             });
 
         } catch (error) {
 
             console.log(error);
             res.status(500).send(error);
         }

    }
}