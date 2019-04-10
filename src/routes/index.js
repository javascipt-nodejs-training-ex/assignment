import express from 'express';
const router =  express.Router();

import { jira } from './../config'

router.get('/', function(req, res, next){
    // ES6
    jira.getAllBoards()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
});

router.get('/:boardId', function(req, res, next){
    // ES6
    jira.getBoard(req.params.boardId)
    .then(data=>{
        console.log(data)
        return jira.getAllSprints(data.id)
    })
    .then(data2 =>{
        console.log(data2)
    })
    .catch(err => {
        console.error(err);
    });

});

module.exports = router;