import UserService from "../service/user-service";
import { Request, response, Response } from "express";
import Joi from "joi";
import { logger } from "../logger";
import jwt from "jsonwebtoken";
import { validatePassword } from "../helpers/validationUtils";
import dotenv from "dotenv";
dotenv.config();

const us = new UserService();

export const login_user = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const foundUser = await us.GetUserLogin(login);
    console.log("founduser", foundUser);
    if (!foundUser) {
      res.status(404).json({ message: `Cannot find user with this ${login} ` });
    } else {
      const authenticate = validatePassword(foundUser, password);
      if (!authenticate) {
        res.status(400).json({ message: "password doesnt match" });
      }
      const token = jwt.sign({ id: login }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({ token, foundUser });
    }
  } catch (error) {
    res.status(503).json({ message: error.message });
    logger.error(`${req.method} ${req.params} ${error.message}`);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await us.GetUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log("response", res);
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await us.Create(req.body);
    res
      .status(201)
      .json(`User with the name ${user.login} added to the database`);
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundUser = await us.Get(id);
    if (!foundUser) {
      res.status(404).json({ message: `Cannot find user with this ${id}` });
    } else {
      res.status(200).json(foundUser);
    }
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundUser = await us.Get(id);
    if (!foundUser) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      await us.Delete(id);
      res.status(204).json({ message: `User with id ${id} is delted` });
    }
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await us.Update(req.body, id);
    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
    res.status(200).json(`User with id ${id} updated successfully`);
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  try {
    const { group_id, user_ids } = req.body;
    const userGroup = await us.AddUsersToGroup(group_id, user_ids);
    console.log("userGrop", userGroup);
    res.status(204).send(userGroup);
  } catch (error) {
    logger.error(`${req.method} ${req.params} ${error.message}`);
    res.status(503).json({ message: error.message });
  }
};
