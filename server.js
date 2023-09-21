const { http, connectToDB } = require("./src/config");
const app = require("./src/app");
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running at localhost:${PORT}`);
});
