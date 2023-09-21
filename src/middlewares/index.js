const { getUserBySessionToken } = require("../model/user");
const { tryCatch, AppError } = require("../utils");
const { merge, get } = require("lodash");

exports.errorHandler = (error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ error: error.message || "Internal Server Error" });
};

exports.isAuthenticated = tryCatch(async (req, res, next) => {
  const sessionToken = req.cookies["SESSION-TOKEN"];
  if (!sessionToken) {
    return AppError(403, "Forbidden");
  }
  //GET USER BY SESSION TOKEN

  const existingUser = await getUserBySessionToken(sessionToken);
  console.log(existingUser);
  if (!existingUser) {
    return AppError(403, "Forbidden");
  }

  merge(req, { identity: existingUser });
});

exports.isOwner = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = get(req, "identity._id");
  if (!currentUserId) {
    return AppError(403, "Forbidden");
  }
  if (currentUserId.toString() !== id) {
    return AppError(403, "Forbidden");
  }
  next();
});
