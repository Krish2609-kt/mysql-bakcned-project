import {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} from "../models/user.model.js";
import asyncHandler from "../utils/asynchandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";


const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    throw new ApiError(400, "Username and password are required");
  }

  const userExist = await getUserByUsername(username);
  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const createdUserId = await createUser(username, password);

  if (!createdUserId) {
    throw new ApiError(500, "Failed to create user");
  }

  const newUser = await getUserById(createdUserId); // optionally fetch new user

  res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully"));
});

export {
  registerUser,
};
