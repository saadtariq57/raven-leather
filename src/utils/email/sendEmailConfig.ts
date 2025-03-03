"use server"
import Mailjet from "node-mailjet"

export default async function sendEmail(data: any) {

  try {
    const { to, subject, htmlContent } = data;
    //Configuring Email
    const mailjetClient = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET
    })

    // Email content and options
    const emailData = {
      FromEmail: "raven.leather.pak@gmail.com",
      FromName: "Raven",
      Recipients: [
        {
          Email: to
        }
      ],
      Subject: subject,
      "Html-part": htmlContent
    };

    // Sending the email
    const result = await mailjetClient.post('send', { version: 'v3' }).request(emailData);
    return result;
    

  } catch (error: any) {
    throw new Error(error.message)
  }
}
