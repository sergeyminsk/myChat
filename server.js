var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res){

    switch (req.url){
        case '/':
            sendFile('index.html', res);
            break;
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        case '/publish':
            var body = '';

            req
                .on('readable', function(){
                    body += req.read();
                    if(body.length > 1e4){
                        res.statusCode = 413;
                        res.end('You message is too big fo my little chat');
                    }
                })
                .on('end', function(){
                    try{
                        body = JSON.parse(body);
                    } catch (e){
                        res.statusCode = 400;
                        res.end('Bad request');
                        return;
                    }
                chat.publish(body.message);
                res.end('ok');
            });
            break;
        default :
            res.statusCode = 404;
            res.end('Not Found');
    }

    function sendFile(file, res){
        var fileStream = fs.ReadStream(file);

        fileStream.pipe(res);

        fileStream.on('error', function(){
            res.statusCode = 500;
            res.end('Server Error');
        });
/*
        fileStream
            .on('open', function(){})
            .on('close', function(){});
        fileStream.on('close', function(){
            fileStream.destroy();
        });*/
    }


    if(req.url == '/'){

  /*      fs.open('sss.txt', 'a+', 0664, function(err, file_handle){
            if(err) throw err;
            fs.write(file_handle, 'Copyrighted by Me', null, 'ascii', function(err, written) {
                if (!err) {
                    // ??? ?????? ??????
                } else {
                    throw err;
                }
            });
        });
*/

//        info = fs.readFileSync('index.html');
/*
        fs.readFile('index.html', function(err, info){
            if(err) throw err;
            fs.readFile('sss.txt', function(err1, info1){
                res.write(info);
                setTimeout(function(){res.end(info1);}, 5000);
            });
*/
/*
            var file = new fs.ReadStream('sss.txt');
            sendFile(file, res);
        });
*/
/*
        function sendFile(file, res){
            file.pipe(res);
        }
*/
/*
        fs.writeFile('created.txt', '1234555', function(err){
            if(err) throw err;
            console.log('created');
            fs.rename('created.txt', 'new.txt', function(err){
                if(err) throw err;
                console.log('renamed');
                fs.unlink('new.txt', function(err){
                    if(err) throw err;
                })
            })
        })
*/
    }

}).listen(8080);


/*
var http = require('http');
var url = require('url');
var debug = require('debug')('server');


var server = new http.Server(function(req, res){
    console.log(req.method, req.url);

    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    if(urlParsed.pathname == '/echo' && urlParsed.query.message){
        res.end(urlParsed.query.message);
        debug('hello');
    }else{
        debug('hello');
        res.statusCode = 404;
        res.end("Page not found");
    }

});

server.listen(8080, 'localhost');

*/



/*
var db = require('./db');
var User = require('./user/user');

function run(){
    var vasya = new User('Vasya');
    var petya = new User('Petya');

    vasya.hello(petya);
    console.log(db.getPhrase('Run sussessful'))
}

if(module.parent){
    exports.run = run;
}else{
    run();
}
*/