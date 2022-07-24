let socket = io.connect();


const theInput = document.getElementById('sendForm');
let display = document.getElementById('display');
const input = document.getElementById('message');
// popup updater of people joining an leaving ELEMENT
const onlineUsersDisplay = document.getElementById('online-users');
// where to show the online users
const onlineDisplay = document.getElementById('onlineDisplay');

let userName = prompt('choose your user name');
socket.emit('new-user', userName);

//sending message
theInput.addEventListener('submit', e => {
    e.preventDefault()
    const message = input.value;
    socket.emit('sendMessage', userName +': ' + message);
    input.value = ' ';
});


socket.on('sendMessage', data => {
    displayMessage(data);
    display.scrollTop =  display.scrollHeight;

})
socket.on('user-connected', data => {
    usersUpdater(data);
})

/*socket.on('showUsers', data => {
    onlineDisplay.append(data[socket.id])
})*/

socket.on('userDisconnected', data => {
    usersUpdater(data);
})


socket.on('onlinePeople', data => {
    showOnlineUsers(data);
})

function displayMessage(message){
    const popup = document.createElement('h4');
    popup.innerText = `${message}`;
    display.append(popup);
}
function usersUpdater(message){
    const popup = document.createElement('p');
    popup.innerText = message;
    onlineDisplay.append(popup);
    setTimeout(function(){
        onlineDisplay.removeChild(popup);
    }, 3000);
}

function showOnlineUsers(array){
    onlineUsersDisplay.innerHTML = " ";

    array.forEach(user =>{
        console.log(user)
        let list = document.createElement('li');
        list.innerText = user;
        onlineUsersDisplay.append(list);
    })

}

