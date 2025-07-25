import mongoose, { Schema, model, Types } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  techStack?: string[];
  experienceLevel?: string;
  lookingFor?: string;
  followers: Types.Array<Types.ObjectId>;
  following: Types.Array<Types.ObjectId>;
  friendRequests: {
    from: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    experienceLevel: { type: String, default: "beginner" },
    lookingFor: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    friendRequests: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
