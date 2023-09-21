const express = require("express");
const authentication = require("./authentication");
const user = require("./user");
const router = express.Router();
module.exports = () => {
  authentication(router);
  user(router);
  return router;
};
