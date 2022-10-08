import express from "express";
import {
  validateSchema,
  querySchema,
  usersGroupSchema,
} from "../helpers/validationUtils";
import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUsersToGroup,
  login_user,
} from "../controllers/user-controller";
import { executionLogger } from "../logger";
import { verifyToken } from "../helpers/requestValidatorUtils";

const router = express.Router();

router.get("/getUsers", verifyToken, executionLogger(getUsers));

router.post("/addUser", validateSchema(querySchema), executionLogger(createUser));

router.get("/:id", executionLogger(getUser));

router.post("/signin", executionLogger(login_user));

router.delete("/:id", executionLogger(deleteUser));

router.post(
  "/users-to-group/",
  validateSchema(usersGroupSchema),
  executionLogger(addUsersToGroup)
);

router.patch("/:id", validateSchema(querySchema), executionLogger(updateUser));

export default router;
