import nodemailer from 'nodemailer';

const ROOT_URL = `http://localhost:3000`;


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "jada88@ethereal.email",
        pass: "VWPtkcxtpZz3feEfUV",
    },
});

export const sendVerificatoinEmail = async (target, username, token) => {
    const info = await transporter.sendMail({
        from: 'GitHall',
        to: `${target}`,
        subject: `Githall Email Verification for ${username} `,
        text: `Please verify your email by visiting this link: ${ROOT_URL}/auth/verify?token=${token}`,
        html: `Please verify your email by visiting this link: <a href="${ROOT_URL}/auth/verify?token=${token}"> ${ROOT_URL}/auth/verify?token=${token}</a>`
    });

    console.log('Email Sent');

}