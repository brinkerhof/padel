const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token required", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("JWT token invalid", 401);
  }
}

module.exports = ensureAuthenticated;
