import { IRegistration } from "@/types/interface";
import mongoose, { model, Schema } from "mongoose";
import { models } from "mongoose";

export interface IregistrationDocument extends IRegistration, mongoose.Document {
    _id: mongoose.Types.ObjectId;
}

const registrationSchema = new Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        isTeam: {
            type: Boolean,
            required: true,
            default: false
        },
        teamId: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        team: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        verified: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true },
);

const Registration = models.Registration ?? model<IregistrationDocument>("Registration", registrationSchema);

export default Registration;