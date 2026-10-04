import { registerUser, loginUser } from "../services/authService.js";

const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
   res.status(200).json({
    success: true,
    user: req.user,
  });
};

export { register, login, getCurrentUser };
