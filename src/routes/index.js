import express from 'express';
const router =  express.Router();

import { jira } from './../config'

router.get('/:issueNumber', function(req, res, next){
    // ES6
    jira.findIssue(req.params.issueNumber)
    .then(issue => {
    console.log(`Status: ${issue.fields.status.name}`);
    })
    .catch(err => {
    console.error(err);
    });
});

module.exports = router;