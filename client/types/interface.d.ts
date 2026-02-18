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
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz" | "Gaming", "Design and Prototyping";
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
  isFoodProvided: boolean;
  maxFoodServingsPerParticipant: number;
  fees: number;
  registrations: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventProps {
  _id: Types.ObjectId;
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz" | "Gaming" | "Design and Prototyping";
  description: string;
  banner?: string | null;
  clubs: string[];
  __v: number;
}

const CATEGORIES = [
  "All",
  "Software",
  "Hardware",
  "Entrepreneurship",
  "Quiz",
  "Gaming",
  "Design and Prototyping",
] as const;

type Category = typeof CATEGORIES[number];

export interface PublicEventProps {
  _id: string;
  eventName: string;
  category: Exclude<Category, "All">;
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
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz" | "Gaming" | "Design and Prototyping";
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

export interface IRegistration {
  eventId: Types.ObjectId;
  isInTeam: boolean;
  teamId?: Types.ObjectId;
  participant: Types.ObjectId;
  verified: boolean;
  checkedIn: boolean;
  checkedInAt?: Date;
  checkedInBy?: Types.ObjectId;
  foodServedCount: number;
  lastFoodServedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeam {
  eventId: Types.ObjectId;
  teamCode: string;
  teamLeader: Types.ObjectId;
  team: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegiEventProps {
  _id: string;
  eventName: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz" | "Gaming" | "Design and Prototyping";
  banner?: string | null;
  date: string;
  time: string;
  venue: string;
  maxMembersPerTeam?: number;
  maxMembersPerTeam?: number;
}

export interface Registration {
  _id: string;
  eventId: RegiEventProps
  isInTeam: boolean,
  participant: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Team {
  _id: string;
  eventId: RegiEventProps
  teamLeader:
  | string
  | {
    _id: string;
    username?: string;
    fullName?: string;
  };
  teamCode: string;
  team: (
    | string
    | {
      _id: string;
      username?: string;
      fullName?: string;
    }
  )[];
  members?: {
    _id: string;
    username?: string;
    fullName?: string;
    isLeader: boolean;
  }[];
  teamSize?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}