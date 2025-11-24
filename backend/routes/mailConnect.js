require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer Transporter Error:", error);
  } else {
    console.log("Nodemailer is ready to send emails ✔");
  }
});

const mailOptions = (client, lawyer) => ({
  from: process.env.EMAIL,
  to: lawyer.email,
  subject: `New Client Consultation Request: ${client.fullName}`,
  html: `
    <p>Dear ${lawyer.name},</p>

    <p>You have received a new consultation request from a client. Details below:</p>

    <h3>Client Information</h3>
    <ul>
      <li><strong>Full Name:</strong> ${client.fullName}</li>
      <li><strong>Email:</strong> ${client.email}</li>
      <li><strong>Phone:</strong> ${client.phone}</li>
      <li><strong>Gender:</strong> ${client.gender}</li>
    </ul>

    <h3>Case Details</h3>
    <ul>
      <li><strong>Issue:</strong> ${client.issue}</li>
      <li><strong>Description:</strong> ${client.description}</li>
    </ul>

    <p>Regards,<br/>LegalConnect Team</p>
  `,
});

module.exports = { transporter, mailOptions };
