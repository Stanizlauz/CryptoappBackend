import * as nodemailer from 'nodemailer';

export const sendEmail = async (email: string, name: string, id: string) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        service: "gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: "rhitanene@gmail.com", // generated ethereal user
            pass: "yywfbkmdrymkqwlr", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Arks Trades" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Verify your email", // Subject line
        text: `Hello ${name}`, // plain text body
        html: `<div>
        <b>Hello ${name},</b>
        <br/><br/>
        <p>Click on the button to verify your email.</p>
        <button style=" background-color: #4169e1;
        border: none;
        color: white;
        padding: 10px 10px;
        text-align: center;
        border-radius: 12px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;"><a href="${id}">Verify Email</a></button>
        </div>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}