import { jira } from '../config';

exports.getBoard = (req, res, next) => {
    jira.getBoard(req.params.boardId)
    .then(board => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(board));
    })
    .catch(err => {
        console.error(err);
    });
}