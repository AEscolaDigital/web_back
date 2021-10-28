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

async function sendingEmail(email, senha) {
  const mailSent = await transporter.sendMail({
    text: "Texto do E-mail",
    subject: "Cadastro na plataforma EduTec",
    from: "Digital School <digital.school.tcc01@gmail.com",
    to: [`${email}`],
    html: `
    <html>
        <body>
            <strong>${senha}</strong></br>
        </body>
    </html> 
    `,
  });

}

module.exports = sendingEmail;

