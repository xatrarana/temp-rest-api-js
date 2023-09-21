const { tryCatch, AppError, Random, Authentication } = require("../utils");
const { getAllUsers } = require("../model/user");

const AllUsers = tryCatch(async (req, res, next) => {
  const users = await getAllUsers();

  if (!users) {
    return AppError(404, "Error in retriving the users");
  }

  return res
    .status(200)
    .json({ success: true, message: "users fetched successfylly", users })
    .end();
});

module.exports = { AllUsers };
