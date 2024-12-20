const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage("You", message);
        getBotResponse(message);
        userInput.value = "";
    }
});

function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = ${sender}: ${text};
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    fetch("http://localhost:5000/respond", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    })
        .then(response => response.json())
        .then(data => {
            addMessage("Bot", data.response);
        })
        .catch(err => {
            addMessage("Bot", "Error: Could not connect to server.");
        });
}

