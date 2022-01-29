const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        var {to, subject, content} = options
        console.log(options);
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE_HOST,
            port: process.env.EMAIL_SERVICE_PORT,
            auth: {
              user: process.env.EMAIL_SERVICE_USER,
              pass: process.env.EMAIL_SERVICE_PASS
            }
        });

        var mailOptions = {
            from: "e-craft@services.com",
            to,
            subject,
            text: content,
        }

        await transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail;