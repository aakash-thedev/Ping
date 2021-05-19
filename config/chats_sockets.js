// we will create socket which will recieve a chatServer

// now this is basically our OBSERVER which will manage any new connections

module.exports.chatSockets = function(socketServer) {

    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){

        console.log('New Socket Connection Established', socket.id);
        // console.log("**************", socket.handshake.query);

        socket.on('join_room', function(data) {

            console.log(`${data.user_email} has requested to join ${data.chatRoom}`);

            // plug in that socket, if data.chatRomm named room is present it will add the user in it
            // if its not present then it will create a new room of that name.

            socket.join(data.chatRoom);

            // inside that chatroom emit a message of user_joined
            io.in(data.chatRoom).emit('user_joined', data.user_email);

        });

        socket.on('send_message', function(data){

            // console.log(`${data.user_email}- ${data.message}`);
            io.in(data.chatRoom).emit('receive_message', data);
        });

        // when any socket will get disconnected

        socket.on('disconnect', function(){
            console.log("Socket Disconnected");
        });

    });
}