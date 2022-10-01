import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import usersRoutes from "./src/routes/user-routes";
import groupRoutes from "./src/routes/group-routes";

const app: Application = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.use("/groups", groupRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Homepage");
});

app.listen(PORT, () => `server running on port : http://localhost:${PORT}`);
