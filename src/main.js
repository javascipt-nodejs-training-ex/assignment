import express from 'express';
import http from 'http';

import routes from './routes';
import boardRoute from './routes/board';

require('https').globalAgent.options.ca = require('ssl-root-cas').create();
const port = 3000;
const app = express();

app.use('/api', routes);
app.use('/board', boardRoute);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default server;