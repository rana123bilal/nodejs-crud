import express from 'express';
import { validateSchema, querySchema } from '../helpers/validation.js';
import {getGroup, createGroup, getAllGroups} from '../controllers/group-controller.js';

const router = express.Router();

router.get('/getgroups', getAllGroups);

// router.get('/users-auto-suggest', getUserAutoSuggest);

router.post('/addgroup', createGroup);

router.get('/:id', getGroup);

// router.delete('/:id', deleteUser);

// router.patch('/:id', validateSchema(querySchema), updateUser);

export default router;
