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
