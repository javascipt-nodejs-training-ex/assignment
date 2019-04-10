import express from 'express';
import https from 'https';

import { jira } from './config'
import routes from './routes';

require('https').globalAgent.options.ca = require('ssl-root-cas').create();


// ES6
jira.findIssue('ER-857')
.then(issue => {
console.log(`Status: ${issue.fields.status.name}`);
})
.catch(err => {
console.error(err);
});

const port = 3000;
const app = express();

app.use('/api', routes)

const server = https.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export default server;