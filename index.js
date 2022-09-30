import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./src/routes/user-routes.js";
import groupRoutes from "./src/routes/group-routes.js";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.use("/groups", groupRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
});

app.listen(PORT, () => `server running on port : http://localhost:${PORT}`);
