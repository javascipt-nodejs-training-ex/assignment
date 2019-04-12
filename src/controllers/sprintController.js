import { jira } from '../config';

exports.getAllSprints = (req, res, next) => {
    jira.getAllSprints(req.params.boardId)
    .then(sprints => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sprints));
    })
    .catch(err => {
        console.error(err);
    });
}

// Show assigned stories of a specific team members
exports.getAssignedStories = (req, res, next) => {
    jira.getIssuesForBoard(req.params.boardId)
    .then(data => {
        let { issues } = data;
        //get story in sprint
        return issues.filter(issue => issue && issue.fields.issuetype.name == "Story" && issue.fields.sprint && issue.fields.sprint.id == req.params.sprintId);
    })
    .then(stories => {
        let story_points = stories.map(point => point.fields.customfield_10002);
        let total_point = story_points.reduce((total, currentPoint) => {
            return total + currentPoint
        })

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'total_point': total_point,stories}));
    })
    .catch(err => {
        console.error(err);
    });
}
// getAssignedStories