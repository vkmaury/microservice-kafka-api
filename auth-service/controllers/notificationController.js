// // auth-service/controllers/notificationController.js

// const twilio = require('twilio');
// const nodemailer = require('nodemailer');

// // Twilio configuration (replace with your credentials)
// const TWILIO_ACCOUNT_SID = 'AC254381aed9a8e99b2810bf657a6b5c5b';
// const TWILIO_AUTH_TOKEN = '97a59d7ffd3040d7a9bcf7d14968c200';
// const twilioPhoneNumber = '+12292672839';

// const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// // Nodemailer configuration (replace with your email credentials)
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'vikaskumarmourya19@gmail.com',
//         pass: 'Vkm9559@'
//     }
// });

// // Function to send SMS using Twilio
// const sendSMS = async (to, message) => {
//     try {
//         const response = await twilioClient.messages.create({
//             body: message,
//             from: twilioPhoneNumber,
//             to: to
//         });
//         console.log('SMS sent:', response.sid);
//         return response;
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         throw error;
//     }
// };

// // Function to send email using Nodemailer
// const sendEmail = async (to, subject, text) => {
//     try {
//         const mailOptions = {
//             from: 'vikaskumarmourya19@gmail.com',
//             to: to,
//             subject: subject,
//             text: text
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info.messageId);
//         return info;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw error;
//     }
// };

// module.exports = {
//     sendSMS,
//     sendEmail
// };
