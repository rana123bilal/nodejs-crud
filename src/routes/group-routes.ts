import express from "express";
import {
  getGroup,
  createGroup,
  getAllGroups,
  deleteGroup,
  updateGroup,
} from "../controllers/group-controller";
import {executionLogger} from '../logger';

const router = express.Router();

router.get("/getgroups",executionLogger(getAllGroups));

router.post("/addgroup", executionLogger(createGroup));

router.get("/:id",executionLogger(getGroup));

router.delete("/:id", executionLogger(deleteGroup));

router.patch("/:id", executionLogger(updateGroup));

export default router;
