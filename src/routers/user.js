const { AllUsers } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares");
module.exports = (router) => {
  router.get("/users", isAuthenticated, AllUsers);
};
