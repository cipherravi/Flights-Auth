const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { serverConfig } = require("./config");
const apiRoutes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log("Server started running at PORT ::", serverConfig.PORT);
});
