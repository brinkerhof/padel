import verify from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { jwt } from "../configs/auth.js";

function ensureAuthenticated(req, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token required", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(token, jwt.secret);

    req.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("JWT token invalid", 401);
  }
}

export default ensureAuthenticated;
