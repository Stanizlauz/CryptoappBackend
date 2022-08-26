import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { forgotPasswordHtml, verifyEmailHtml } from './verifyhtml';

export const sendEmail = async (email: string, name: string, id: string, type: string) => {
    let htmlText: string;
    if (type === "register") {
        htmlText = verifyEmailHtml(email, name, id)
    } else {
        htmlText = forgotPasswordHtml(email, name, id)
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: "arkstrades.info@gmail.com", // generated ethereal user
            pass: "figeduyckmluhyiy", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Arks Trades" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Verify your email", // Subject line
        text: `Hello ${name}`, // plain text body
        attachments: [{
            filename: 'logo1.png',
            path: join(__dirname + '/logo1.png'),
            cid: 'arkstrades'
        }],
        html: htmlText, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}