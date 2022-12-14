import NodeMailer from 'nodemailer'

const sendEmail = async (options) => {

    var transporter = NodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASSWORD
        }
    });


    const mailOption = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(mailOption)
}


export default sendEmail