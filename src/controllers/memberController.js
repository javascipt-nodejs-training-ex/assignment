
import { jira } from '../config';

exports.getUsers = (req, res, next) => {
    jira.getBoardIssuesForSprint(req.params.boardId, req.params.sprintId)
    .then(data => {
        return data.issues.map(issue => issue.fields.assignee);
    })
    .then(data => {
        let uniqueAssignees = [];
        let fullInfoAssignees = [];
        data.forEach(ele => {
            if(ele && !uniqueAssignees.includes(ele.name)){
                uniqueAssignees.push(ele.name)
                fullInfoAssignees.push(ele);
            }
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(fullInfoAssignees));
    })
    .catch(err => {
        console.error(err);
    });
}