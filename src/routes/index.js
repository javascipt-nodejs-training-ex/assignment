import express from 'express';
import apicache from 'apicache';

import BoardController from './../controllers/boardController';
import SprintController from './../controllers/sprintController';
import MemberController from './../controllers/memberController';
import ReportController from './../controllers/reportController';

const route =  express.Router();
let cache = apicache.middleware;

// route.use(cache('1 hour'))

route.get('/:boardId', BoardController.getBoard);
route.get('/:boardId/all-sprints', SprintController.getAllSprints);
route.get('/:boardId/:sprintId/assigned-stories', SprintController.getAssignedStories);
route.get('/:boardId/:sprintId/user', MemberController.getUsers);
route.get('/:boardId/sprint/:sprintId/username=:username', MemberController.getMemberForSprint);
route.get('/:boardId/:sprintId/daily-report', ReportController.dailyReport);
route.get('/:boardId/:sprintId/weekly-report', ReportController.weeklyReport);

module.exports = route;