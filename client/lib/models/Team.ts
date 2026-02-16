import { ITeam } from "@/types/interface";
import mongoose, { model, Schema, models, Document } from "mongoose";

export interface ITeamDocument extends ITeam, Document {
    _id: mongoose.Types.ObjectId;
}

const teamSchema = new Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        teamCode: {
            type: String,
            unique: true,
            required: true
        },
        teamLeader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        team: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Team = models.Team || model<ITeamDocument>("Team", teamSchema);

export default Team;