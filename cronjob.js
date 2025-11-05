const cron = require('node-cron');
const nodemailer = require('nodemailer');

const password = 'process.env.password'; // Gmail App Password

async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nidhi.k.devadiga12@gmail.com", // ✅ sender email
        pass: password, // ✅ app password
      },
    });

    const mailOptions = {
      from: '"Skill Lab" <nidhi.k.devadiga12@gmail.com>', // ✅ must match sender
      to: 'nidhi.k.devadiga12@gmail.com', // ✅ receiver email
      subject: 'Your report is ready',
      text: 'Congratulations! You have won a lottery 🎉',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
}

// ✅ Runs every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  console.log('⏰ Executing every 10 seconds...');
  sendEmail();
});
