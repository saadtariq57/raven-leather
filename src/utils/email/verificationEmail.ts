import sendEmail from "./sendEmailConfig";

export default async function SendVerificationEmail(email: string, verifyCode: string) {
    try {
        const response = await sendEmail({
            to: email,
            subject: "Raven Verification Code",
            htmlContent: `
                    <div>
                    <h1>Verification Code for Raven account</h1>
                    <p>Here's your verification code: <strong>${verifyCode}</strong></p>
                    <p>Please use this code to complete your verification.</p>
                    </div>
                    `,
        })

        return response;

    } catch (error) {
        console.error('Error while sending verification email:', error);
    }
}