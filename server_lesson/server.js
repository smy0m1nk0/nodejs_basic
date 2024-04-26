const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) => {
    // console.log('request made');
    // console.log(req.url);
    // console.log(req.method);
    
    // if(req.url === '/'){
    //     res.write('Hello, world');
    //     res.end();
    // } else {
    //     res.write('using some other domain');
    //     res.end();
    // }

    // set header content type

    //lodash
    // const num = _.random(0, 20);
    // console.log(num);

    // const greet = _.once(() => {
    //     console.log('hello');
    // });
    
    // greet();
    // greet();
    // log one time only

    res.setHeader('Content-Type', 'text/html');
    
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    // res.write('Hello, world');
    fs.readFile(path,(err,data) =>{
        if(err){
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            res.end(data); 
        }
    });
    
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});