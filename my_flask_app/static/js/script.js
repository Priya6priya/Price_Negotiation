// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Function to send message to the Flask backend
    sendButton.addEventListener('click', function () {
        const message = userInput.value.trim();  // Get the user input message

        if (message) {
            // Append the user's message to the chat box
            chatBox.innerHTML += `<div class="user-message">You: ${message}</div>`;

            // Make a POST request to the Flask API
            fetch('/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                // Append the bot's response to the chat box
                chatBox.innerHTML += `<div class="bot-response">Bot: ${data.response}</div>`;
                userInput.value = '';  // Clear the input field
                chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
            })
            .catch(error => {
                console.error('Error:', error);
                chatBox.innerHTML += `<div class="bot-response">Bot: Sorry, there was an error.</div>`;
            });
        }
    });
});
