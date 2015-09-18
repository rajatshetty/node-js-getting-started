/**
 * Created by rshetty2 on 9/9/15.
 */


var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var path = require('path');

var connections = {};

app.get('/',function(req,res){
    var express=require('express');
    app.use(express.static(path.join(__dirname)));
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){

    console.log('a user connected hello');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('initiate',function(user){
        connections[user]=socket;

        for(user in connections) {
            console.log("Initiate");
        }
    });


    socket.on('notify',function(user,currentuser,msg){
        connections[user].emit('pushnotification',user,currentuser,msg);
        console.log("Sending notification to user "+user);
    });
});

http.listen(3000,function(){
    console.log('Listening on *:3000');
})