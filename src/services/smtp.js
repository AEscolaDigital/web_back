const nodemailer = require("nodemailer");
const stmp = require("../config/stmp");

const transporter = nodemailer.createTransport({
  host: stmp.host,
  port: stmp.port,
  secure: false,
  auth: {
    user: stmp.user,
    pass: stmp.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendingEmail = async (email, senha, name) => {

  await transporter.sendMail({
    text: "Texto do E-mail",
    subject: "Cadastro na plataforma EduTec",
    from: "Digital School <digital.school.tcc01@gmail.com",
    to: [`${email}`],
    html: `
    <html>
        <body style="max-width: 700px; margin: auto;" >
            <h2 style="font-size: 22px;>Olá, ${name}</h2>
            <br><br>
            <h1 style="font-size: 20px;> Parabéns ${name} você acaba de ser cadastrado na plataforma EduTec  </h1>
            
            <br><br>
            <img style="width: 500px; height: 450px; margin-left: 150px; " src="https://firebasestorage.googleapis.com/v0/b/school-12606.appspot.com/o/imageEmail%2Fundraw_Celebration_re_kc9k.png?alt=media&token=61ebeb50-f15b-43bf-9b35-f49f790e52f9" />
            <br><br>
            <strong style="font-size: 20px;" >Sua senha é: <span style="background-color: #a3a3a3; color: white; padding: 7px 15px 7px 15px; " > ${senha}</span> </strong>
            <h2> <a href="http://localhost:3000">Clique aqui para ir até a plataforma </h2>
        </body>
    </html> 
    `,
  });

}

module.exports = sendingEmail;
