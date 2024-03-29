const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    //testing
    //console.log(filePath);
    //res.end();

    //Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //Check extension and set content type for server
    switch (extname) {
        case '.js':
            contentType = "text/javascript";
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;   
        case '.svg':
            contentType = 'image/svg+xml'
    };

    //Check if ContentType is text/html but no .html file extension
    if (contentType == 'text/html' && extname == '') filePath += '.html';
    //Log the filePath
    console.log(filePath);

    //Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'),
                (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                }
                );
            } else {
                //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //Success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        } 
    })
});

// change the port number to suit. ie 5000, 8080.
const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
