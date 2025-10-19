import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstname, lastname, tel, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Specify your email service provider configuration
      service: 'Gmail',
      auth: {
        user: 'kavindavidura@gmail.com',
        pass: '53677153'
      }
    });

    // Compose email message
    const mailOptions = {
      from: 'kavindavidura1999@gmail.com',
      to: `'${email}'`,
      subject: 'New Contact Form Submission',
      text: `
        Name: ${firstname} ${lastname}
        Phone Number: ${tel}
        Email: ${email}
        Message: ${message}
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
