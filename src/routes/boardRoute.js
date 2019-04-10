import express from 'express';

import { jira } from '../config';
const boardRouter =  express.Router();

boardRouter.get('/:boardId', function(req, res, next){
  jira.getBoard(req.params.boardId)
    .then(board => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(board));
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = boardRouter;