import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeConfig = {
    service: "gmail",
    auth: {
        user: ENV.EMAIL, 
        pass: ENV.PASSWORD
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: {
        body: {
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
        },
 
        text: {
            color: '#333333',
        },
        button: {
            color: '#ffffff',
            backgroundColor: '#007bff',
        },
        link: {
            color: '#007bff',
        },
    },
    product: {
        name: "STUDYEASY",
        link: 'https://mailgen.js/'
    }
});

export const registerMail = async (req, res) => {
    const { firstName, email, text, subject } = req.body;
    var Mainemail = {
        body: {
            name: firstName,
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
    let emailBody = MailGenerator.generate(Mainemail);
    let message = {
        from: ENV.EMAIL,
        to: email,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }))
}
