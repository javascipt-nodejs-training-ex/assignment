
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

exports.getMemberForSprint = (req, res, next) => {
    let boardId = req.params.boardId;
    let sprintId = req.params.sprintId;
    let userArray = req.params.username.split(',');
    let assigneeArray = [];

    jira.getBoardIssuesForSprint(boardId, sprintId)
    .then(data => {
        data.issues.filter(issue => {
            for (let user = 0; user < userArray.length; user ++)
            {
                if(issue.fields.assignee.name == userArray[user] )
                {
                    assigneeArray.push(issue);
                }
            }
        })
       res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(assigneeArray));
       
    })
    .catch(err => {
        console.error(err);
    });
}