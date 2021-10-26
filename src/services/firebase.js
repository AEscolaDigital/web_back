const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key");

const BUCKET = "school-12606.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
    if (!req.file) return next(); 

    const imagem = req.file;

    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();

    const file = bucket.file("profile_picture/"+ nomeArquivo);

    const stream = file.createWriteStream({
        metadata:{
            contentType: imagem.mimeType,

        },
    });

    stream.on("error", (error) => {
        console.error(error);

        res.status(500).send({ error: "Erro ao subir para o Firebase" });
    })

    stream.on("finish", async () => {
        //tornar o arquivo público
        await file.makePublic();

        //obter a url público
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/profile_picture/${nomeArquivo}`;

        next();
    })

    stream.end(imagem.buffer);
}

module.exports = uploadImage;