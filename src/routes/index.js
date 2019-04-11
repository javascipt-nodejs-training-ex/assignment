import express from 'express';

import BoardController from './../controllers/boardController';
import SprintController from './../controllers/sprintController';

const route =  express.Router();

route.get('/:boardId',BoardController.getBoard);
route.get('/:boardId/all-sprints', SprintController.getAllSprints);

module.exports = route;