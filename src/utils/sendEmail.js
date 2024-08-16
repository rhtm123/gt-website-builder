// const nodemailer = require('nodemailer');

import nodemailer from "nodemailer";

async function sendEmail(recipientMail, subject, htmlContent) {
    try {
      // Create a Nodemailer transporter
    //   console.log(process.env.EMAIL_HOST_USER,process.env.EMAIL_HOST_PASSWORD)

      const transporter = nodemailer.createTransport({
        // host: 'smtp.zoho.com',
        // port: 465, // Use port 465 for secure SMTP
        // secure: true, // true for 465, false for other ports
        service: 'gmail', // Update with your email service provider
        auth: {
          user: process.env.EMAIL_HOST_USER, // Update with your email address
          pass: process.env.EMAIL_HOST_PASSWORD, // Update with your email password
        },
      });
  
      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_HOST_USER, // Update with your email address
        to: recipientMail, // Update with the recipient's email address
        subject: subject, // Update with the subject
        html: htmlContent,
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

export default sendEmail;