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
import {executionLogger} from '../logger';

const router = express.Router();

router.get('/getUsers', executionLogger(getUsers));

router.post('/addUser', validateSchema(querySchema), executionLogger(createUser));

router.get('/:id', executionLogger(getUser));

router.delete('/:id', executionLogger(deleteUser));

router.post('/users-to-group/', executionLogger(addUsersToGroup));

router.patch('/:id', validateSchema(querySchema), executionLogger(updateUser));

export default router;
