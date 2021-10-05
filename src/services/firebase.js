const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key");

const BUCKET = "school-12606.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImages = (req, res, next) => {
    if (!req.files) return next();

    const images = req.files;

    const fileRG = Date.now() + "." + images[0].originalname.split(".").pop();

    const fileCPF = Date.now() + Math.random() + "." + images[1].originalname.split(".").pop();
    

    const files = bucket.file(fileRG, fileCPF);

    const stream = files.createWriteStream({
        metadata:{
            contentType: images[0].mimeType,
            contentType: images[1].mimeType
        },
    });

    stream.on("error", (error) => {
        console.error(error);
        res.status(500).send({ error: "Erro ao subir para o Firebase" });
    })

    stream.on("finish", async () => {
        //tornar o arquivo público
        await files.makePublic();

        //obter a url público
        req.files[0].firebaseUrlRG = `https://storage.googleapis.com/${BUCKET}/${fileRG}`;
        req.files[1].firebaseUrlCPF = `https://storage.googleapis.com/${BUCKET}/${fileCPF}`;

        next();
    })

    stream.end(images.buffer);

}

module.exports = uploadImages;