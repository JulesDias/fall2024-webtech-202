const url = require('url');
const qs = require('querystring');

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url);
    const path = route.pathname;
    const params = qs.parse(route.query);

    // Log the path and query parameters
    console.log(path);
    console.log(params);

    res.writeHead(200, {'Content-Type': 'text/html'});

    // Respond based on the path and query params
    if (path === '/hello' && 'name' in params) {
      res.write('Hello ' + params['name']);
    } else {
      res.write('Hello anonymous');
    }

    console.log('i am in handle');
    res.end();
    
  }
};
