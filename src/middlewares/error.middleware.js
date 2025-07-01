import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

const errorMiddleware = (err, req, res, next) => {

    const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;

  // Log detailed error info (in dev only)
  console.error(`[ERROR] ${err.name || "Error"}: ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Custom ApiError
  if (err instanceof ApiError) {
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, null, err.message));
  }

  // Fallback for unknown errors
  return res
    .status(statusCode)
    .json(
      new ApiResponse(statusCode, null, "Something went wrong. Please try again.")
    );
};

export default errorMiddleware;
