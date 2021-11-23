const admin = require("firebase-admin");

const BUCKET = "school-12606.appspot.com";

const bucket = admin.storage().bucket();

const uploadTask = async (req, res, next) => {

    if (!req.files) return next();

    const files = req.files;

    try {

        if (files.file) {
            await uploadFile(files);
        }

        if (files.file1) {
            await uploadFile1(files);
        }

        if (files.file2) {
            await uploadFile2(files);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Erro ao subir para o Firebase" });
    }

    next();
}

const uploadFile = (files) => {

    return new Promise((resolve, reject) => {

        const file0 = files.file[0];

        const fileName = Date.now() + "." + file0.originalname.split(".").pop();

        const file = bucket.file("task/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: file0.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            file0.firebaseUrlFile = `https://storage.googleapis.com/${BUCKET}/task/${fileName}`;

            resolve(file0);
        })

        stream.end(file0.buffer);
    })
}

const uploadFile1 = (files) => {

    return new Promise((resolve, reject) => {

        const file1 = files.file1[0];

        const fileName = Date.now() + "." + file1.originalname.split(".").pop();

        const file = bucket.file("task/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: file1.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            file1.firebaseUrlFile1 = `https://storage.googleapis.com/${BUCKET}/task/${fileName}`;

            resolve(file1);
        })

        stream.end(file1.buffer);

    })
}

const uploadFile2 = (files) => {

    return new Promise((resolve, reject) => {

        const file2 = files.file2[0];

        const fileName = Date.now() + "." + file2.originalname.split(".").pop();

        const file = bucket.file("task/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: file2.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            file2.firebaseUrlFile2 = `https://storage.googleapis.com/${BUCKET}/task/${fileName}`;

            resolve(file2);
        })

        stream.end(file2.buffer);

    })
}

module.exports = uploadTask;