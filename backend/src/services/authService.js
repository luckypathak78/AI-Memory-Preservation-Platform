import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  user.lastLogin = new Date();
  await user.save();

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  };
};

export { registerUser, loginUser };
