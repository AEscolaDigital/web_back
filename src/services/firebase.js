const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key");

const BUCKET =  "school-12606.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImages = (req, res, next) => {
    if (!req.files) return next(); 

    const images = req.files;

    const fileRG = Date.now() + "." + images[0].originalname.split(".").pop(); 
    const fileCPF = Date.now() + "." + images[1].originalname.split(".").pop();

    const file_RG = bucket.file("students/rg/" + fileRG);
    const file_CPF = bucket.file("students/cpf/" + fileCPF);

    const stream = file_RG.createWriteStream({
        metadata:{contentType: images[0].mimeType, },
    });

    const streamCPF = file_CPF.createWriteStream({
        metadata:{contentType: images[1].mimeType, },
    });

    stream.on("error", (error) => {
        console.error(error);
        res.status(500).send({ error: "Erro ao subir para o Firebase" });
    })

    streamCPF.on("error", (error) => {
        console.error(error);
        res.status(500).send({ error: "Erro ao subir para o Firebase" });
    })

    stream.on("finish", async () => {
        //tornar o arquivo público
        await file_RG.makePublic();

        //obter a url público
        req.files[0].firebaseUrl = `https://storage.googleapis.com/${BUCKET}/students/rg/${fileRG}`;

        next();
    })

    streamCPF.on("finish", async () => {
        //tornar o arquivo público
        await file_CPF.makePublic();

        //obter a url público
        req.files[1].firebaseUrl = `https://storage.googleapis.com/${BUCKET}/students/cpf/${fileCPF}`;

        next();
    })

    streamCPF.end(images[1].buffer);
    stream.end(images[0].buffer);

}

module.exports = uploadImages;