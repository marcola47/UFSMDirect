import Mail from 'nodemailer/lib/mailer';

const nodemailer = require('nodemailer');

export default transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }

}
);
