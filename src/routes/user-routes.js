import express from 'express';
import { validateSchema, querySchema } from '../helpers/validation.js';
import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserAutoSuggest,
} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/getUsers', getUsers);

router.get('/users-auto-suggest', getUserAutoSuggest);

router.post('/addUser', validateSchema(querySchema), createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', validateSchema(querySchema), updateUser);

export default router;
