const sgMail = require("@sendgrid/mail");
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY);


// konisi1132@themesw.com
// alexei20293@yahoo.com
// svetlanagyk981@gmail.com
// const data = {
//   to: "alexei20293@yahoo.com",
//   subject: "Verify email",
//   html: `<p>Verify email</p>`
// }

// sgMail.send(email)
//   .then(() => console.log('success'))
//   .catch(err => console.log(err));

const sendEmail = async(data) => { 
    const email = { ...data, from: "olexiy.solotvinskiy@gmail.com" };
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;