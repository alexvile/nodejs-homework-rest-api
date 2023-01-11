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

const sendMail = async (data) => {
    const email = {...data, from: "alexei20293@meta.ua"}
    // console.log(email);
    await transport.sendMail(email)
    console.log("Email send successfull");
}

module.exports = { sendMail };