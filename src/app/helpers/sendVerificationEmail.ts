import { resend } from "../lib/resend";
import VerificationEmail from "../../../emails/VerficationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
) : Promise<ApiResponse>
{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Wisp Talk|  Verification Code',
            react: VerificationEmail({username, otp : verifyCode}),
          });
        return {success : true, message : "Succesfully to send email"}
    } catch (error) {
        console.log("Error in sending verification email",error);
        return {success : false, message : "Failed to send email"}
    }
}