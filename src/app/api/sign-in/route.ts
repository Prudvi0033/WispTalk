import connectDB from "@/app/lib/db";
import { UserModel } from "@/app/models/User.model";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await connectDB();

    try {
        const { username, email, password } = await request.json();

        // Check if a verified user with the same username exists
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({ msg: "Username already exists" }, { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date(Date.now() + 3600000); // 1-hour expiry

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({ msg: "User already exists by this email" }, { status: 403 });
            } else {
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = expiryDate;
                await existingUserByEmail.save();
            }
        } else {
            await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMsg: true,
                messages: []
            });
        }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponse.success) {
            return Response.json({ msg: emailResponse.message }, { status: 500 });
        }

        return Response.json({ msg: "User Registered Successfully. Check your email for verification." }, { status: 200 });

    } catch (error) {
        console.error("Error in Sign-up:", error);
        return Response.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}
