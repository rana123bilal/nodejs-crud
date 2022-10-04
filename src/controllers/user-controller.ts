import UserService from "../service/user-service";
import {Request, Response} from 'express';
import {logger} from '../logger';

const us = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try{
  const users = await us.GetUsers();
  return res.status(200).json(users);
  }catch(error)
{
  logger.error(`${req.method} ${req.params} ${error.message}`);
}};

export const createUser = async (req: Request, res: Response) => {
  try{
  const user = await us.Create(req.body);
  res.status(201).json(`User with the name ${user.login} added to the database`);
  }catch(error){
    logger.error(`${req.method} ${req.params} ${error.message}`);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try{
  const { id } = req.params;
  const foundUser = await us.Get(id);
  if (!foundUser) {
    res.status(404).json({ message: `Cannot find user with this ${id}` });
  } else {
    res.status(200).json(foundUser);
  }
}catch(error){
  logger.error(`${req.method} ${req.params} ${error.message}`);
}
};

export const deleteUser = async (req: Request, res: Response) => {
  try{
  const { id } = req.params;
  const foundUser = await us.Get(id);
  if (!foundUser) {
    res.status(404).json({ message: `User with id ${id} not found` });
  }else{
    await us.Delete(id);
    res.status(204).json({ message: `User with id ${id} is delted` });
  }
}catch(error){
  logger.error(`${req.method} ${req.params} ${error.message}`);
}
};

export const updateUser = async (req: Request, res: Response) => {
  try{
  const { id } = req.params;
  const user = await us.Update(req.body, id);
  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
  res.status(200).json(`User with id ${id} updated successfully`);
}catch(error){
  logger.error(`${req.method} ${req.params} ${error.message}`);
}
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  try{
  const { group_id, user_ids } = req.body;
  await us.AddUsersToGroup(group_id, user_ids);
  if (!group_id) {
    res.status(404).json({ message: `Group with id ${group_id} not found` });
  }

  if (!user_ids.length) {
    res.status(404).json({
      message: "Please provide user ids which you want to add to the group",
    });
  }
  res.status(204).send();
}catch(error){
  logger.error(`${req.method} ${req.params} ${error.message}`);

}
};
