const {
  express,
  compression,
  cookieParser,
  cors,
  dotEnv,
  path,
} = require("./config");
dotEnv.config();
const { errorHandler } = require("./middlewares");
const routers = require("./routers");

const app = express();

//middlewares
app.use(compression());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routers());

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ success: false, message: "resource not found!!" })
    .end();
});

app.use(errorHandler);

module.exports = app;
