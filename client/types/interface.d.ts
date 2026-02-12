import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    passwordHash?: string;
    image?: string;
    avatar?: number;
    emailVerified?: Date;
    amongUsScore?: number;
    createdAt: Date;
    updatedAt: Date;
    fullName?: string;
    phoneNumber?: string;
    college?: string;
    stream?: string;
    isProfileComplete: boolean;
}