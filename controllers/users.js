import { v4 as uuidv4 } from 'uuid';

let users = [];

export const createUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4(), isDeleted: false });
  res
    .status(201)
    .json(`User with the name ${user.login} added to the database`);
};

export const getUsers = (req, res) => {
  res.status(200).json(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    res.status(404).json({ message: `Cannot find user with this ${id} ` });
  } else {
    res.status(200).json(foundUser);
  }
};

export const getUserAutoSuggest = (req, res) => {
  const usersResult = users
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((value) => value.login.startsWith(req.query.loginSubstring))
    .slice(0, Number(req.query.limit) || 10);

  if (!usersResult.length) {
    res.status(404).json({ message: 'No users were found' });
  } else {
    res.status(200).json(usersResult);
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  user.isDeleted = true;
  res.send(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (user) {
    if (login) user.login = login;
    if (password) user.password = password;
    if (age) user.age = age;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: `Cannot find user with this ID ${id}` });
  }
};
