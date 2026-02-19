import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import {
  ADMIN_ROLES,
  IMPOSTER_PERMISSIONS,
  type AdminRole,
  type ImposterPermission,
} from "@/lib/admin-types";

export { ADMIN_ROLES, IMPOSTER_PERMISSIONS };
export type { AdminRole, ImposterPermission };

export interface IAdminUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string | null;
  role: AdminRole;
  permissions: ImposterPermission[];
  invitedBy: string;
  passwordSetAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminUserDocument extends IAdminUser, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminUserSchema = new Schema<IAdminUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
      enum: ADMIN_ROLES,
      required: true,
    },
    permissions: {
      type: [String],
      enum: IMPOSTER_PERMISSIONS,
      default: [],
    },
    invitedBy: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    passwordSetAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

adminUserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.passwordHash) return false;
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const AdminUser =
  models.AdminUser ?? model<IAdminUserDocument>("AdminUser", adminUserSchema);

export default AdminUser;
