import express from 'express';

import BoardController from './../controllers/boardController';
import SprintController from './../controllers/sprintController';
import MemberController from './../controllers/memberController';
import UserController from './../controllers/userController';

const route =  express.Router();

route.get('/:boardId',BoardController.getBoard);
route.get('/:boardId/all-sprints', SprintController.getAllSprints);
route.get('/user/:boardId/:sprintId', MemberController.getUsers);
route.get('/:boardId/sprint/:sprintId/?username=', UserController.getIssuesForSprint);

module.exports = route;