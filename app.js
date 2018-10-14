var express = require('express');
// var cors = require('cors');
var app = express();

// app.use(cors());
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.all( '*' , (req,res,next) =>{
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header('Access-Control-Allow-Origin',req.headers.origin||'*');
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//         res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
//         if (req.method === 'POST') {
//             res.send(200);
//         } else {
//             next();
//         }
// });

// var corsOptions = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   };
// app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

// remove these lines of the code as well
app.use(express.static(path.join(__dirname, "/")));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.configure(function() {
    io.set('transports', ['websocket']);
});

io.configure(function() {
    io.set('match origin protocol', true);
});
  
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('obj message', function(msgobj){
        console.log(msgobj);
        io.emit('obj message', msgobj);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

var port = process.env.PORT || 443;   
http.listen(port, function(){
    console.log('listening on *:port');
});

// var port = process.env.PORT||3000;
// console.log(port);
// app.listen(port);

//mdoc
      

//Updated
      
// http.listen(80, function () { 
//     Updated var addr = app.address(); 

//     console.log(' app listening on http://' + addr.address + ':' + addr.port); 
// });