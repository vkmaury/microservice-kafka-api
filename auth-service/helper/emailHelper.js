const transporter = require('../config/email');

exports.sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    });
    console.log('OTP sent to', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};
