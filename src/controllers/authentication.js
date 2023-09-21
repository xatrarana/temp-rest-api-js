const { createUser, getUserByEmail } = require("../model/user");
const { tryCatch, AppError, Random, Authentication } = require("../utils");
const register = tryCatch(async (req, res) => {
  const { username, email, password, cpassword } = req.body;
  if (!username || !email || !password || !cpassword) {
    return AppError(400, "fields are required.");
  }
  const existingUser = await getUserByEmail(email);
  console.log(existingUser);
  if (existingUser) {
    return AppError(403, "user with email already exists");
  }
  const salt = Random();
  const hashPass = Authentication(salt, password);
  const user = await createUser({
    username: username,
    email: email,
    authentication: {
      salt,
      password: hashPass,
    },
  });
  if (!user) {
    return AppError(500, "error in user creation");
  }
  console.log(user);

  res.status(200).json({ sucess: true, user }).end();
});
const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return AppError(400, "fields are required.");
  }
  const user = await getUserByEmail(email).select(
    "+authentication.salt +authentication.password"
  );
  if (!user) {
    return AppError(401, "Invalid credentials.");
  }
  const expectedHash = Authentication(user.authentication.salt, password);

  if (expectedHash !== user.authentication.password) {
    return AppError(401, "invalid credentials.");
  }
  const salt = Random();
  user.authentication.sessionToken = Authentication(salt, user._id.toString());
  await user.save();
  // set cookie with res.cookie("cookie-name","cookie-value") before sending the response
  res.cookie("SESSION-TOKEN", user.authentication.sessionToken, {
    domain: "localhost",
    path: "/",
  });
  return res.status(200).json(user).end();
});

module.exports = { register, login };
