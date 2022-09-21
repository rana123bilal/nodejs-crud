import express from 'express';
import { validateSchema, querySchema } from '../helpers/validation.js';
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserAutoSuggest,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/users-auto-suggest', getUserAutoSuggest);

router.post('/', validateSchema(querySchema), createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', validateSchema(querySchema), updateUser);

export default router;
