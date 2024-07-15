const apiKey = 'API_KEY'; // Replace with your actual API key
const sendRequest = async () => {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        appendMessage('You', userInput);
        document.getElementById('userInput').value = '';

        try {
            const body = {
                contents: [
                  {
                    parts: [{ text: userInput }],
                    role: "user"
                  }
                ]
              };
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey,
               {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                  }
            );
            const data = await response.json()
            const botResponse =  data.candidates[0].content.parts[0].text
            appendMessage('Bot', botResponse);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Bot', 'Sorry, something went wrong.');
        }
    }
}
document.getElementById('sendBtn').addEventListener('click', sendRequest);
document.getElementById("single-form").addEventListener("submit", (event) => {
    event.preventDefault();
})
function appendMessage(sender, markdown) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender.toLowerCase());
    messageElement.innerHTML = marked.parse(markdown);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
