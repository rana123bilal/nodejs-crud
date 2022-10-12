import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import corsOptions from "./src/cors/Cors";
import usersRoutes from "./src/routes/user-routes";
import groupRoutes from "./src/routes/group-routes";
import morgan from "morgan";
import { logger } from "./src/logger";

const app: Application = express();
app.use(corsOptions);
const PORT = 8000;
app.use(bodyParser.json());

const myStream = {
  write: (text: any) => {
    logger.info(text);
  },
};

app.use(morgan("combined", { stream: myStream }));

app.use("/users", usersRoutes);

app.use("/groups", groupRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Homepage");
});

app.use((error: any, req: Request, res: Response, next : NextFunction) => {
  res.status(500).send(error.message);
  logger.error(
    `${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method}`
  );
});


process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception!", () => {
    console.error(
      `${new Date().toUTCString()} uncaughtException:`,
      err.message
    );
    console.error(err.stack);
    process.exit(1);
  });
});

process.on("unhandledRejection", (error: any) => {
  logger.error("Unhandled Rejection", () => {
    console.error(
      `${new Date().toUTCString()} Unhandled rejection:`,
      error.message
    );
    console.error(error.stack);
  });
});

app.listen(PORT, () => `server running on port : http://localhost:${PORT}`);
