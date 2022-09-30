import express from "express";
import {
  getGroup,
  createGroup,
  getAllGroups,
  deleteGroup,
  updateGroup,
} from "../controllers/group-controller.js";

const router = express.Router();

router.get("/getgroups", getAllGroups);

router.post("/addgroup", createGroup);

router.get("/:id", getGroup);

router.delete("/:id", deleteGroup);

router.patch("/:id", updateGroup);

export default router;
