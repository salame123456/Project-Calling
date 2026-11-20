const message_input = document.getElementById("message_input")
const message_output = document.getElementById("message_output")

function sendMessage(){
    message_output.textContent = message_input.value
}