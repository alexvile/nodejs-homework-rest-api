const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "alexei20293@meta.ua",
        pass: META_PASSWORD,
    }
}


const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "olexiy.solotvinskiy@gmail.com",
//   from: "alexei20293@meta.ua",
//   subject: "nodemailer test",
//   text: "Привет. Мы тестируем отправку писем!",
// }

const sendMail = async (data) => {
    const email = {...data, from: "alexei20293@meta.ua"}
    try {
        await transport.sendMail(email)
        console.log("Email send successfull");
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendMail };