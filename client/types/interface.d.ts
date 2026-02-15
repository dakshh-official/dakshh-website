import mongoose, { Types } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  roles: ("participant" | "volunteer" | "admin" | "super_admin")[];
  passwordHash?: string;
  image?: string;
  avatar?: number;
  provider: "google" | "credentials";
  emailVerified?: Date;
  verified?: boolean;
  amongUsScore?: number;
  createdAt: Date;
  updatedAt: Date;
  fullName?: string;
  phoneNumber?: string;
  college?: string;
  stream?: string;
  isProfileComplete: boolean;
}

export interface IPoc {
  name: string;
  mobile: string;
}

export interface IEvent {
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz";
  date: string;
  time: string;
  duration: string;
  venue: string;
  description: string;
  banner?: string | null;
  rules: string[];
  clubs: string[];
  isTeamEvent: boolean;
  pocs: IPoc[];
  maxMembersPerTeam: number;
  minMembersPerTeam: number;
  prizePool: number;
  isPaidEvent: boolean;
  fees: number;
  registrations: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventProps {
  _id: Types.ObjectId;
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship";
  description: string;
  banner?: string | null;
  clubs: string[];
  __v: number;
}

export interface PublicEventProps {
  _id: string;
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz";
  description: string;
  banner?: string | null;
  clubs: string[];
  date: string;
  time: string;
  venue: string;
  isTeamEvent: boolean;
  minMembersPerTeam: number;
  maxMembersPerTeam: number;
  prizePool: string;
  __v: number;
}

export interface EventByIdProps {
  _id: Types.ObjectId;
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz";
  description: string;
  banner?: string | null;
  rules: string[];
  clubs: string[];
  pocs: IPpoc[];
  date: string;
  time: string;
  venue: string;
  isTeamEvent: boolean;
  membersPerTeam: number;
  prizePool: string;
  __v: number;
}
