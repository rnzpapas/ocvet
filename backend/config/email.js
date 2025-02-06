import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config(); 


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PW,  
  },
  tls: {
    rejectUnauthorized: false
  }
});


export const sendEmail = (otp, email, subject) => {
  const mailOptions = {
    from: process.env.EMAIL,   
    to: email, 
    subject: subject,  
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
          <title>Email OTP</title>
      </head>
      <body>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 100%; max-width: 600px; margin: auto;">
              <h2 style="color: #007BFF; text-align: center; font-family: 'Poppins', sans-serif;">Your One-Time PIN (OTP)</h2>
              <p style="font-size: 16px; color: #333; text-align: center; font-family: 'Poppins', sans-serif;">
                  Dear user, <br><br>
                  This is your One-Time PIN (OTP) to verify your identity. Please use the code below to complete your verification:
              </p>
              <h3 style="font-size: 30px; text-align: center; color: #333; font-weight: bold; font-family: 'Poppins', sans-serif; letter-spacing: 1.2rem;">
                  ${otp}
              </h3>
              <p style="font-size: 16px; color: #333; text-align: center; font-family: 'Poppins', sans-serif;">
                  The OTP is valid for the next 5 minutes. If you did not request this code, please ignore this email.
              </p>
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 10px; font-family: 'Poppins', sans-serif;">
                  Thank you for using our service.
              </p>
          </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });

}
