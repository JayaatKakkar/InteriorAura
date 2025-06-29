const nodemailer = require('nodemailer');

// // Configure the transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use your email service
//   auth: {
//     user: 'your-email@gmail.com', // Your email
//     pass: 'your-email-password',  // Your email password or app-specific password
//   },
// });

// // Function to send email
// const sendEmail = (clientEmail, subject, text) => {
//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: clientEmail,
//     subject: subject,
//     text: text,
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.error('Error sending email:', err);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// // // When appointment is accepted
// // const handleAppointmentUpdate = (appointmentId, status) => {
// //   // Assuming appointment is fetched from DB
// //   Appointment.findById(appointmentId, (err, appointment) => {
// //     if (err) {
// //       console.error('Error fetching appointment:', err);
// //     } else {
// //       const architectName = appointment.architect.architect_name;
// //       const clientEmail = appointment.email_id;
// //       const subject = `Appointment ${status} by ${architectName}`;
// //       const text = `Dear ${appointment.name},\n\nYour appointment scheduled for ${new Date(appointment.app_date).toLocaleDateString()} at ${formatTime(appointment.app_time)} has been ${status} by ${architectName}. \n\nBest regards,\n${architectName}`;

// //       sendEmail(clientEmail, subject, text);
// //     }
// //   });
// // };

// module.exports=sendEmail;

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;