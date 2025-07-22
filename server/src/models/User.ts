import mongoose, {Schema, model} from "mongoose";


export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    techStack?: string[];
    experienceLevel?: string;
    lookingFor?: string;
    createdAt: Date;
  }

  const userSchema = new Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true },
      avatar: { type: String, default: "" },
      bio: { type: String, default: "" },
      techStack: { type: [String], default: [] },
      experienceLevel: { type: String, default: "beginner" },
      lookingFor: { type: String, default: "" },
    },
    {
      timestamps: true,
    }
  );

  const User = model<IUser>("User", userSchema);

export default User;
