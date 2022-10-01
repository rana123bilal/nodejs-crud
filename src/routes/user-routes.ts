import express from 'express';
import { validateSchema, querySchema } from '../helpers/validation';
import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUsersToGroup,
} from '../controllers/user-controller';

const router = express.Router();

router.get('/getUsers', getUsers);

router.post('/addUser', validateSchema(querySchema), createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.post('/users-to-group/', addUsersToGroup);

router.patch('/:id', validateSchema(querySchema), updateUser);

export default router;
