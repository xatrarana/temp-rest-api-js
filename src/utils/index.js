const crypto = require("crypto");
const jwt = require("jsonwebtoken");
exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
    next();
  } catch (error) {
    next(error);
  }
};

exports.AppError = (status, message) => {
  const error = new Error();
  error.message = message;
  error.status = status;
  throw error;
};

exports.Random = () => {
  return crypto.randomBytes(128).toString("base64");
};

exports.Authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("+"))
    .update(process.env.SECRET)
    .digest("hex");
};

exports.GenerateToken = (object) => {
  const token = jwt.sign(object, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  return token;
};

exports.VerifyToken = () => {};
