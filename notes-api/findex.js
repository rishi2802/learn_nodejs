const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if(req.url === '/fnote' && req.method === 'GET'){

    
    fs.writeFile('notes1.json', 'This is the first line\n', (err) => {
    if (err) {
      console.log("Error writing first line:", err);
      return;
    }

    fs.appendFile('notes.json', 'This is the second line\n', (err) => {
      if (err) {
        console.log("Error writing second line:", err);
        return;
      }

      fs.appendFile('notes.json', 'Final line from callback test\n', (err) => {
        if (err) {
          console.log("Error writing third line:", err);
          return;
        }

        console.log("All lines written using callbacks");
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("All writes completed");

      });
    });
  });
  }
  
});

server.listen(3100, () => {
  console.log("Server running on port 3100");

});
