const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key");

const BUCKET = "school-12606.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();



const uploadImage = (req, res, next) => {
    if (!req.files) return next(); 

    const imagen = req.files.imagen[0];
    const imagenCPF = req.files.rg[0];

    uploadImageRG(imagen, next);

    uploadImageCPF(imagenCPF, next);
    
}


const uploadImageRG = (imagen, next) => {

    const fileName = Date.now() + "." + imagen.originalname.split(".").pop();
    
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
        metadata:{
            contentType: imagen.mimeType,

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
        imagen.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`;

        next();
    })

    stream.end(imagen.buffer);
} 


const uploadImageCPF = (imagenCPF, next) =>{
    
    const fileName = Date.now() + "555"+ "." + imagenCPF.originalname.split(".").pop();
    
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
        metadata:{
            contentType: imagenCPF.mimeType,
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
        imagenCPF.firebaseUrlCPF = `https://storage.googleapis.com/${BUCKET}/${fileName}`;

        next();
    })

    stream.end(imagenCPF.buffer);
}


module.exports = uploadImage;
