async function botReply(message) {
    const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
}

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if(userInput.trim()==="") return;

    const messages = document.getElementById("messages");

    const userMsgDiv = document.createElement("div");
    userMsgDiv.classList.add("message","user");
    userMsgDiv.textContent = "You: "+userInput;
    messages.appendChild(userMsgDiv);

    const reply = await botReply(userInput);

    const botMsgDiv = document.createElement("div");
    botMsgDiv.classList.add("message","bot");
    botMsgDiv.textContent = "Bot: "+reply;
    messages.appendChild(botMsgDiv);

    document.getElementById("userInput").value = "";
    messages.scrollTop = messages.scrollHeight;
}
