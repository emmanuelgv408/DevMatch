import User, { IUser } from "../models/User";
const bcrypt = require("bcrypt");

export async function createUserService(userData: IUser) {
  try {
    if (
      !userData.name ||
      !userData.username ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error("Name, username, email, and password are required.");
    }

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });
    if (existingUser) throw new Error("Email or username already exists.");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      avatar: userData.avatar || "",
      bio: userData.bio || "",
      techStack: userData.techStack || [],
      experienceLevel: userData.experienceLevel || "beginner",
      lookingFor: userData.lookingFor || "",
    });

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  } catch (error: any) {
    throw new Error("Failed to create user: " + error.message);
  }
}
