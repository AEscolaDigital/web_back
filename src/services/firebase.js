const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key");

const BUCKET = "school-12606.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImages = async (req, res, next) => {

    if (!req.files) return next();

    // const imagenCPF = req.files.image_cpf[0];
    const imagenRG = req.files.image_rg[0];
    // const imageCpfResponsible = req.files.image_cpf_responsible[0];
    // const imageProofOfResidence = req.files.image_proof_of_residence[0];

    const fileName = Date.now() + "." + imagenRG.originalname.split(".").pop();

    let resposta = await uploadImageRG(imagenRG, fileName).catch(e => res.status(500).send({ error: "Erro ao subir para o Firebase" }));
    // uploadImageCPF(imagenCPF, next, fileName);
    // uploadImageCpfResponsible(imageCpfResponsible, next, fileName);
    // uploadImageProofOfResidence(imageProofOfResidence, next, fileName);

    next();
}


const uploadImageRG = (imagem, fileName) => {

    return new Promise((resolve, reject) => {
        const file = bucket.file("students/rg/" + fileName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: imagem.mimeType,
            },
        });


        stream.on("error", (error) => {
            console.error(error);

            reject(error);
        })

        stream.on("finish", async () => {
            //tornar o arquivo público
            await file.makePublic();

            //obter a url público
            imagem.firebaseUrl = `${fileName}`;

            resolve(imagem)
        })

        stream.end(imagem.buffer);
    })


}


const uploadImageCPF = (imagenCPF, next, fileName) => {

    const file = bucket.file("students/cpf/" + fileName);

    const stream = file.createWriteStream({
        metadata: {
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
        imagenCPF.firebaseUrl = `${fileName}`;
    })

    stream.end(imagenCPF.buffer);
}

const uploadImageCpfResponsible = (imageCpfResponsible, next, fileName) => {

    const file = bucket.file("students/cpf_responsible/" + fileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: imageCpfResponsible.mimeType,
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
        imageCpfResponsible.firebaseUrl = `${fileName}`;
    })

    stream.end(imageCpfResponsible.buffer);
}

const uploadImageProofOfResidence = (imageProofOfResidence, next, fileName) => {

    const file = bucket.file("students/proof_of_residence/" + fileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: imageProofOfResidence.mimeType,
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
        imageProofOfResidence.firebaseUrl = `${fileName}`;
    })

    stream.end(imageProofOfResidence.buffer);
}


module.exports = uploadImages;
