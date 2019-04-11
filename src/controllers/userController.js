import { jira } from '../config';

exports.getIssuesForSprint = (req, res, next) => {
    let boardId = req.params.boardId;
    let sprintId = req.params.sprintId;
    let userArray = req.query.username.split(',');
    let assigneeArray = [];

    console.log(userArray);
    jira.getBoardIssuesForSprint(boardId, sprintId)
    .then(issues => {
        issues.issues.filter(issue => {
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