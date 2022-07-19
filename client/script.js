let socket = io.connect();


const theInput = document.getElementById('sendForm');
const display = document.getElementById('display');
const input = document.getElementById('message');

let userName = prompt('choose your user name');

theInput.addEventListener('submit', e => {
    e.preventDefault()
    const message = input.value;
    socket.emit('sendMessage', userName +': ' + message);
    input.value = ' ';
})

socket.on('sendMessage', data => {
    displayMessage(data);
})

function displayMessage(message){
    const popup = messageElement = document.createElement('h4');
    popup.innerText = message;
    display.append(popup);

}