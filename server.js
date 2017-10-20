const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');

//GET OUR API ROUTES
const api = require('./server/routes/api');

const app = express();

app.use(logger('dev'));
//PARSER FOR POST DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Points STATIC FILES TO DIST
app.use( express.static(path.join(__dirname, 'dist')));

//SET API ROUTES
app.use('/api', api);

//CATCH ALL ROUTES AND RETURN TO dist/index.js

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

/*GET port from environment and store in express
*/
const port = process.env.port || '3000';
app.set('port', port);

//CREATE HTTP SERVER

const server = http.createServer(app)

server.listen(port, ()=> console.log(`API running on localhost:${port}`));
