const admin = require("firebase-admin");

const BUCKET = "school-12606.appspot.com";

const bucket = admin.storage().bucket();

const uploadImagesResponsible = async (req, res, next) => {

    if (!req.files) return next();

    const images = req.files;

    const have_profile_picture = Object.assign({profile_image: false}, images);
 
    try {

        if (have_profile_picture.profile_image == false) {
             
            await uploadImageRG(images);

            await uploadImageCPF(images);

            await uploadImageProofOfResidence(images);

        } else {

            await uploadProfileImage(images);
            
        }

    } catch (error) {
        return res.status(500).send({ error: "Erro ao subir para o Firebase" });
    }

    next();
}

const uploadImageRG = (images) => {

    return new Promise((resolve, reject) => {

        const imageRG = images.image_rg[0];

        const fileName = Date.now() + "." + imageRG.originalname.split(".").pop();

        const file = bucket.file("responsibles/rg/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: imageRG.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            imageRG.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/responsibles/rg/${fileName}`;

            resolve(imageRG)
        })

        stream.end(imageRG.buffer);
    })
}

const uploadImageCPF = (images) => {

    return new Promise((resolve, reject) => {

        const imageCPF = images.image_cpf[0];

        const fileName = Date.now() + "." + imageCPF.originalname.split(".").pop();

        const file = bucket.file("responsibles/cpf/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: imageCPF.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            imageCPF.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/responsibles/cpf/${fileName}`;
            resolve(imageCPF)
        })

        stream.end(imageCPF.buffer);
    })
}

const uploadImageProofOfResidence = (images) => {

    return new Promise((resolve, reject) => {

        const imageProofOfResidence = images.image_proof_of_residence[0];

        const fileName = Date.now() + "." + imageProofOfResidence.originalname.split(".").pop();

        const file = bucket.file("responsibles/proof_of_residence/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: imageProofOfResidence.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            imageProofOfResidence.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/responsibles/proof_of_residence/${fileName}`;
            resolve(imageProofOfResidence);
        })

        stream.end(imageProofOfResidence.buffer);
    })

}

const uploadProfileImage = (images) => {

    return new Promise((resolve, reject) => {

        const image_profile = images.profile_image[0];
           
        const fileName = Date.now() + "." + image_profile.originalname.split(".").pop();

        const file = bucket.file("responsibles/profile_images/" + fileName);

        const stream = file.createWriteStream({
            metadata: { contentType: image_profile.mimeType, },
        });

        stream.on("error", (error) => {
            console.error(error);
            reject(error);
        })

        stream.on("finish", async () => {
            await file.makePublic();

            image_profile.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/responsibles/profile_images/${fileName}`;
            resolve(image_profile);
        })

        stream.end(image_profile.buffer);
    })

}


module.exports = uploadImagesResponsible;
