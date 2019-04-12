import express from 'express';
import apicache from 'apicache';

import BoardController from './../controllers/boardController';
import SprintController from './../controllers/sprintController';
import MemberController from './../controllers/memberController';

const route =  express.Router();
let cache = apicache.middleware;

// route.use(cache('1 hour'))

route.get('/:boardId', BoardController.getBoard);
route.get('/:boardId/all-sprints', SprintController.getAllSprints);
route.get('/:boardId/:sprintId/assigned-stories', SprintController.getAssignedStories);
route.get('/user/:boardId/:sprintId', MemberController.getUsers);

module.exports = route;