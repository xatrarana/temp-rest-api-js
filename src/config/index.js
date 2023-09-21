const express = require("express");
const http = require("http");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const path = require("path");
const connectToDB = require("../db/connection");
const mongoose = require("mongoose");
const { merge, get } = require("lodash");

module.exports = {
  express,
  http,
  compression,
  cookieParser,
  cors,
  dotEnv,
  path,
  connectToDB,
  merge,
  mongoose,
  get,
};
