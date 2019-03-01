const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = '';
	timeStamp = new Date();               // timestamp to print in log.txt

  if (q.pathname.includes('documentation')) {
    filePath = './documentation.html';
  } else {
    filePath = './index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + q.pathname + '\nTimestamp: ' + timeStamp + '\n\n', function(err) {
    if (err) throw err;
    console.log('log.txt updated! The log.txt file has a new record');
  });


  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
