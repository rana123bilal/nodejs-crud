import UserService from "../service/user-service.js";

const us = new UserService();

export const getUsers = async (req, res) => {
  const users = await us.GetUsers();
  return res.status(200).json(users);
};

export const createUser = async (req, res) => {
  const user = await us.Create(req.body);
  res
    .status(201)
    .json(`User with the name ${user.login} added to the database`);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await us.Get(id);
  if (!foundUser) {
    res.status(404).json({ message: `Cannot find user with this ${id}` });
  } else {
    res.status(200).json(foundUser);
  }
};

export const getUserAutoSuggest = async (req, res) => {
  const { loginSubString, limit } = req.params;
  const usersResult = await us.GetSuggested(loginSubString, limit);

  if (!usersResult.length) {
    res.status(404).json({ message: "No users were found" });
  } else {
    res.status(200).json(usersResult);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await us.Delete(id);
  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
  res.status(204).json({ message: `User with id ${id} is delted` });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await us.Update(req.body, id);
  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
  res.status(200).json(`User with id ${id} updated successfully`);
};

export const addUsersToGroup = async (req, res) => {
  const { group_id, user_ids } = req.body;
  if (!group_id) {
    res.status(404).json({ message: `Group with id ${group_id} not found` });
  }

  if (!user_ids.length) {
    res.status(404).json({
      message: "Please provide user ids which you want to add to the group",
    });
  }
  await us.AddUsersToGroup(group_id, user_ids);
  res.status(204).send();
};
