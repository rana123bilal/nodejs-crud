import GroupService from "../service/group-service";
import { Request, Response } from "express";
import { logger } from "../../src/logger";

const groupService = new GroupService();

export const getGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await groupService.Get(id);
    if (!group) {
      res
        .status(404)
        .json({ message: `Group with this id ${id} does not exist` });
    } else {
      res.status(200).json(group);
    }
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.GetAll();

    if (!groups.length) {
      res.status(404).json({ message: "No groups exsisted" });
    } else {
      res.status(200).json(groups);
    }
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { id, name, permissions } = req.body;
    const newGroup = { id, name, permissions };
    const group = await groupService.Create(newGroup);
    res.status(201).json(group);
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await groupService.Update(req.body, id);

    if (!group) {
      res.status(404).json({ message: `Group with id ${id} not found` });
    }

    res.status(200).json(`Group with id ${id} updated successfully`);
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await groupService.Delete(id);
    if (!group) {
      res.status(404).json({ message: `Group with id ${id} not found` });
    }

    res.status(204).send();
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};
