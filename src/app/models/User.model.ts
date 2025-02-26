import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MessageModel = mongoose.model<IMessage>("MessageModel", MessageSchema);

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMsg: boolean;
    messages: mongoose.Types.ObjectId[]; // Reference to MessageModel
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Enter verification code"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMsg: {
        type: Boolean,
        default: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "MessageModel"
    }]
});

const UserModel: Model<IUser> = mongoose.model<IUser>("UserModel", UserSchema);

export { UserModel, MessageModel };
