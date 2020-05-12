

$(function(){
    var socket = io.connect("https://localhost:3000");
    
    var message = $('#message');
    var username = $('#username');
    var sendMessage  = $('#sendMessage');
    var sendUser = $('#sendUser');
    var chatRoom = $('#chat_room');
    var feedback = $("#feedback")
    
    sendMessage.click(function(){
        socket.emit('new_message',{message:message.val});
    })
    socket.on('new_message',(data)=>{
        console.log(data);
        chatRoom.append("<p class='message'>"+data.username+":"+data.message+"</p>");
    })
    
    sendUser.click(()=>{
        console.log(username.val);
        socket.emit('change_username',{username:username.val});
    })
    message.bind("keypress", () => {
		socket.emit('typing')
	})
	
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
    
})
