// const admin = require("firebase-admin");

// const serviceAccount = require("../config/firebase-key");

// const BUCKET = "school-12606.appspot.com";

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: BUCKET,
// });

// const bucket = admin.storage().bucket();

// const uploadFirebaseImageProfile = (req, res, next) => {
//     if (!req.file) return next();

//     const image = req.file;

//     const fileName = Date.now() + "." + image.originalname.split(".").pop();

//     const file = bucket.file("students/profile_images/" + fileName);

//     const stream = file.createWriteStream({
//         metadata: { contentType: image.mimeType, }
//     });

//     stream.on("error", (error) => {
//         console.error(error);

//         res.status(500).send({ error: "Erro ao subir para o Firebase" });
//     });

//     stream.on("finish", () => {
//         file.makePublic();

//         req.file.fileName = fileName;

//         req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/students/profile_images/${fileName}`;

//         next();
//     });

//     stream.end(image.buffer);
// };

// module.exports = uploadFirebaseImageProfile;