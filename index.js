const http = require('http');
const handles = require('./handle');
const db = require('./db');



const server = http.createServer(handles.serverHandle);
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

